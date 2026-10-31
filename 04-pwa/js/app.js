// ---------- Work out today's name ("Mon", "Tue", ...) ----------
const now = new Date();
const todayName = CAMPUS.days[(now.getDay() + 6) % 7]; // JS: Sunday = 0, our list starts at Monday
let selectedDay = todayName;

// ---------- Dashboard ----------
// "09:30" -> 570 minutes after midnight, so times can be compared.
function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function renderDashboard() {
  document.getElementById('greeting').textContent = 'Hello, ' + CAMPUS.studentName.split(' ')[0];
  document.getElementById('today-date').textContent = now.toDateString();

  const todaysClasses = CAMPUS.timetable[todayName];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const next = todaysClasses.find((c) => toMinutes(c.start) > nowMinutes);
  const attendanceOk = CAMPUS.attendancePercent >= 75;

  const cards = [
    {
      label: "Today's classes",
      value: todaysClasses.length,
      note: next ? `Next: ${next.subject} at ${next.start}` : 'No more classes today',
      color: 'var(--primary)',
    },
    {
      label: 'Attendance',
      value: CAMPUS.attendancePercent + '%',
      note: attendanceOk ? 'You are above the 75% limit' : 'Below 75% - attend more classes',
      color: attendanceOk ? 'var(--success)' : 'var(--danger)',
    },
    {
      label: 'Pending assignments',
      value: CAMPUS.pendingAssignments,
      note: 'Open the mobile app to tick them off',
      color: 'var(--accent)',
    },
  ];

  document.getElementById('cards').innerHTML = cards
    .map(
      (c) => `
      <div class="card" style="border-left-color:${c.color}">
        <div class="label">${c.label}</div>
        <div class="value" style="color:${c.color}">${c.value}</div>
        <div>${c.note}</div>
      </div>`
    )
    .join('');
}

// ---------- Timetable ----------
function renderDayButtons() {
  const holder = document.getElementById('day-buttons');
  holder.innerHTML = '';
  CAMPUS.days.forEach((day) => {
    const button = document.createElement('button');
    button.className = 'day-btn' + (day === selectedDay ? ' active' : '');
    button.textContent = day;
    button.addEventListener('click', () => {
      selectedDay = day;
      renderDayButtons();
      renderClasses();
    });
    holder.appendChild(button);
  });
}

function renderClasses() {
  const classes = CAMPUS.timetable[selectedDay];
  const holder = document.getElementById('class-list');

  if (classes.length === 0) {
    holder.innerHTML = `<p class="empty">No classes on ${selectedDay}. Enjoy your day!</p>`;
    return;
  }

  holder.innerHTML = classes
    .map(
      (c) => `
      <div class="class-card">
        <div class="class-time">${c.start}<br />${c.end}</div>
        <div class="class-info">
          <strong>${c.subject}</strong>
          <span class="muted">${c.room}</span>
        </div>
      </div>`
    )
    .join('');
}

// ---------- Tabs (Dashboard / Timetable) ----------
document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// ---------- Offline message ----------
function updateOnlineStatus() {
  document.getElementById('offline-banner').hidden = navigator.onLine;
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ---------- "Install app" button ----------
let installPrompt = null;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // stop the browser's own mini-bar
  installPrompt = event; // keep it until the user taps our button
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installBtn.hidden = true;
});

// ---------- Service worker (makes offline use possible) ----------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}

// ---------- Start ----------
renderDashboard();
renderDayButtons();
renderClasses();
updateOnlineStatus();
