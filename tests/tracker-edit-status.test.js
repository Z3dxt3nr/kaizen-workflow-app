const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

function createDom(relativePath, options = {}) {
  let html = fs.readFileSync(path.join(__dirname, '..', 'public', relativePath), 'utf8');
  if (options.mockChart) {
    html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/chart\.js"><\/script>/, '<script>window.Chart = function Chart(){ return {}; };</script>');
  }
  const dom = new JSDOM(html, {
    url: `http://localhost:4000/${relativePath}`,
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.confirm = () => true;
      window.alert = () => {};
      if (options.mockChart) {
        window.Chart = function Chart() { return {}; };
      }
    },
  });

  dom.window.confirm = () => true;
  dom.window.alert = () => {};
  return dom;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForWindowFunction(dom, name) {
  for (let i = 0; i < 30; i += 1) {
    if (typeof dom.window[name] === 'function') return;
    await wait(50);
  }
  throw new Error(`Timed out waiting for window.${name}`);
}

function setField(document, id, value) {
  const el = document.getElementById(id);
  el.value = value;
  el.dispatchEvent(new document.defaultView.Event('change', { bubbles: true }));
}

function mockDownloadAPIs(window) {
  window.URL.createObjectURL = () => 'blob:kaizen-test';
  window.URL.revokeObjectURL = () => {};
  window.HTMLAnchorElement.prototype.click = function click() {
    window.__lastDownload = { href: this.href, download: this.download };
  };
}

async function importIntoTracker(dom, data) {
  const file = new dom.window.File([JSON.stringify(data)], 'import.json', { type: 'application/json' });
  dom.window.importTrackerData({ target: { files: [file], value: 'x' } });
  await wait(100);
}

async function testCanEditIdeaStatusAfterCreation() {
  const dom = createDom('tracker.html');
  const { document, localStorage } = dom.window;

  localStorage.clear();
  setField(document, 'ideaInput', 'Fix leaking hydraulic hose');
  setField(document, 'department', 'Maintenance');
  setField(document, 'category', 'Safety');
  setField(document, 'statusSelect', 'In Progress');

  dom.window.addIdea();

  let ideas = JSON.parse(localStorage.getItem('kaizenIdeas'));
  assert.strictEqual(ideas.length, 1, 'idea should be saved');
  assert.strictEqual(ideas[0].status, 'In Progress', 'new idea starts as In Progress');

  const statusEditor = document.querySelector('[data-testid="idea-status-select-0"]');
  assert(statusEditor, 'saved idea should render an editable status dropdown');

  statusEditor.value = 'Completed';
  statusEditor.dispatchEvent(new dom.window.Event('change', { bubbles: true }));

  ideas = JSON.parse(localStorage.getItem('kaizenIdeas'));
  assert.strictEqual(ideas[0].status, 'Completed', 'changing dropdown should persist Completed status');
  assert(document.getElementById('ideaList').textContent.includes('Completed'), 'updated status should render in idea list');
}

async function testCanEditIdeaTextDepartmentAndCategory() {
  const dom = createDom('tracker.html');
  const { document, localStorage } = dom.window;

  localStorage.setItem('kaizenIdeas', JSON.stringify([{
    text: 'Old idea',
    department: 'Production',
    category: 'Efficiency',
    status: 'On Hold',
    photo: null
  }]));

  dom.window.loadIdeas();
  dom.window.editIdea(0);

  setField(document, 'ideaInput', 'Updated idea');
  setField(document, 'department', 'Logistics');
  setField(document, 'category', 'Quality');
  setField(document, 'statusSelect', 'Completed');
  dom.window.saveIdeaEdit();

  const ideas = JSON.parse(localStorage.getItem('kaizenIdeas'));
  assert.deepStrictEqual(
    { text: ideas[0].text, department: ideas[0].department, category: ideas[0].category, status: ideas[0].status },
    { text: 'Updated idea', department: 'Logistics', category: 'Quality', status: 'Completed' },
    'edit flow should update the saved idea fields'
  );
}

async function testTrackerImportExportDeleteAndReset() {
  const dom = createDom('tracker.html');
  const { document, localStorage } = dom.window;
  mockDownloadAPIs(dom.window);

  localStorage.setItem('kaizenIdeas', JSON.stringify([{ text: 'Existing', department: 'Maintenance', category: 'Safety', status: 'In Progress' }]));
  localStorage.setItem('kaizen5SAuditHistory', JSON.stringify([{ department: 'Maintenance', average: '3.5' }]));
  dom.window.loadIdeas();

  dom.window.exportTrackerData();
  assert.strictEqual(dom.window.__lastDownload.download.startsWith('kaizen-workflow-backup-'), true, 'export should trigger backup download');

  await importIntoTracker(dom, {
    version: '1.3.0',
    ideas: [{ text: 'Imported', department: 'Admin', category: 'Other', status: 'Completed' }],
    auditHistory: [{ department: 'Admin', average: '4.2' }]
  });

  let ideas = JSON.parse(localStorage.getItem('kaizenIdeas'));
  assert.strictEqual(ideas.length, 2, 'import should merge ideas');
  assert(document.getElementById('ideaList').textContent.includes('Imported'), 'imported idea should render');
  assert.strictEqual(JSON.parse(localStorage.getItem('kaizen5SAuditHistory')).length, 2, 'import should merge audit history');

  dom.window.deleteIdea(1);
  ideas = JSON.parse(localStorage.getItem('kaizenIdeas'));
  assert.strictEqual(ideas.length, 1, 'delete should remove one idea');

  dom.window.resetData();
  assert.strictEqual(localStorage.getItem('kaizenIdeas'), null, 'reset should clear ideas');
}

async function testDashboardReflectsEditedStatus() {
  const dom = createDom('dashboard.html', { mockChart: true });
  await waitForWindowFunction(dom, 'loadDashboard');
  const { document, localStorage } = dom.window;

  dom.window.Chart = function Chart() { return {}; };
  localStorage.setItem('kaizenIdeas', JSON.stringify([
    { text: 'Done', department: 'Maintenance', category: 'Safety', status: 'Completed', dateAdded: '2026-07-01T00:00:00.000Z' },
    { text: 'Waiting', department: 'Admin', category: 'Other', status: 'On Hold', dateAdded: '2026-07-01T00:00:00.000Z' }
  ]));
  localStorage.setItem('kaizen5SAuditHistory', JSON.stringify([{ average: '4.0', department: 'Maintenance', date: '2026-07-01' }]));

  dom.window.initializeDates();
  dom.window.loadDashboard();

  assert.strictEqual(document.getElementById('totalIdeas').innerText, 2, 'dashboard total should match ideas');
  assert.strictEqual(document.getElementById('completedIdeas').innerText, 1, 'dashboard completed count should reflect edited status');
  assert.strictEqual(document.getElementById('onHoldIdeas').innerText, 1, 'dashboard on hold count should reflect statuses');
  assert.strictEqual(document.getElementById('progressPercent').innerText, '50% Completed', 'dashboard progress should update from status');
}

(async () => {
  await testCanEditIdeaStatusAfterCreation();
  await testCanEditIdeaTextDepartmentAndCategory();
  await testTrackerImportExportDeleteAndReset();
  await testDashboardReflectsEditedStatus();
  console.log('tracker regression tests passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
