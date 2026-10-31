// ---------- State: the things that can change while the app runs ----------
let allEvents = [];       // every event loaded from events.json
let searchText = '';      // what the user typed in the search bar
let category = 'All';     // which filter button is selected

// ---------- Grab the HTML elements we need to talk to ----------
const listEl = document.getElementById('event-list');
const searchEl = document.getElementById('search');
const filterEl = document.getElementById('filter');
const modalEl = document.getElementById('event-modal');

// ---------- Small helpers ----------
// Stops event text from being treated as HTML (a basic safety habit).
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// "2026-11-06" -> "6 Nov 2026"
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ---------- Load the data ----------
async function loadEvents() {
  try {
    const response = await fetch('data/events.json');
    allEvents = await response.json();
    render();
  } catch (error) {
    listEl.innerHTML = '<p class="empty-text">Could not load events. Check your connection.</p>';
  }
}

// ---------- Draw the list on screen ----------
function render() {
  const matches = allEvents.filter((ev) => {
    const matchesCategory = category === 'All' || ev.category === category;
    const matchesSearch = ev.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  listEl.innerHTML = '';

  if (matches.length === 0) {
    listEl.innerHTML = '<p class="empty-text">No events found.</p>';
    return;
  }

  matches.forEach((ev) => {
    const item = document.createElement('ion-item');
    item.setAttribute('button', ''); // makes the row tappable
    item.setAttribute('detail', ''); // shows the small arrow on the right
    item.innerHTML = `
      <ion-label>
        <h2>${escapeHtml(ev.title)}</h2>
        <p>${formatDate(ev.date)} at ${escapeHtml(ev.time)}</p>
        <p>${escapeHtml(ev.venue)}</p>
      </ion-label>
      <ion-badge slot="end">${escapeHtml(ev.category)}</ion-badge>
    `;
    item.addEventListener('click', () => openDetails(ev));
    listEl.appendChild(item);
  });
}

// ---------- Show the details screen ----------
function openDetails(ev) {
  document.getElementById('m-category').textContent = ev.category;
  document.getElementById('m-title').textContent = ev.title;
  document.getElementById('m-when').textContent = `${formatDate(ev.date)} at ${ev.time}`;
  document.getElementById('m-venue').textContent = `Venue: ${ev.venue}`;
  document.getElementById('m-description').textContent = ev.description;
  modalEl.isOpen = true;
}

// ---------- React to what the user does ----------
searchEl.addEventListener('ionInput', (event) => {
  searchText = event.detail.value || '';
  render();
});

filterEl.addEventListener('ionChange', (event) => {
  category = event.detail.value;
  render();
});

document.getElementById('close-modal').addEventListener('click', () => {
  modalEl.isOpen = false;
});

modalEl.addEventListener('didDismiss', () => {
  modalEl.isOpen = false;
});

// ---------- Start ----------
loadEvents();
