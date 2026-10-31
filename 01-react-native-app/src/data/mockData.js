// Sample ("mock") data. Version 1 has no real server, so the app reads from here.

export const ATTENDANCE_PERCENT = 82;
export const DEPARTMENT = 'B.Sc Computer Science';

// The student account that already exists (used for the demo login).
export const DEMO_USER = {
  id: 'CS2026001',
  name: 'Priya Sharma',
  password: 'student123',
};

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Timetable: every day has a list of classes. Times are 24-hour "HH:MM".
export const timetable = {
  Mon: [
    { id: 'm1', subject: 'Mobile App Dev', start: '09:00', end: '10:00', room: 'Lab 2' },
    { id: 'm2', subject: 'Web Technologies', start: '10:15', end: '11:15', room: 'Room 101' },
    { id: 'm3', subject: 'Database Systems', start: '11:30', end: '12:30', room: 'Room 204' },
  ],
  Tue: [
    { id: 't1', subject: 'Software Engineering', start: '09:00', end: '10:00', room: 'Room 101' },
    { id: 't2', subject: 'Mobile App Dev Lab', start: '10:15', end: '12:15', room: 'Lab 2' },
    { id: 't3', subject: 'Java Programming', start: '14:00', end: '15:00', room: 'Room 305' },
  ],
  Wed: [
    { id: 'w1', subject: 'Web Technologies', start: '09:00', end: '10:00', room: 'Room 101' },
    { id: 'w2', subject: 'Database Systems', start: '10:15', end: '11:15', room: 'Room 204' },
    { id: 'w3', subject: 'Aptitude Training', start: '11:30', end: '12:30', room: 'Hall A' },
  ],
  Thu: [
    { id: 'h1', subject: 'Java Programming', start: '09:00', end: '10:00', room: 'Room 305' },
    { id: 'h2', subject: 'Software Engineering', start: '10:15', end: '11:15', room: 'Room 101' },
    { id: 'h3', subject: 'Mobile App Dev', start: '11:30', end: '12:30', room: 'Lab 2' },
  ],
  Fri: [
    { id: 'f1', subject: 'Web Technologies Lab', start: '09:00', end: '11:00', room: 'Lab 1' },
    { id: 'f2', subject: 'Database Lab', start: '11:15', end: '13:15', room: 'Lab 3' },
  ],
  Sat: [{ id: 's1', subject: 'Department Seminar', start: '10:00', end: '11:30', room: 'Auditorium' }],
  Sun: [],
};

// "dueInDays" = how many days from today the work is due.
export const initialAssignments = [
  { id: 'a1', subject: 'Mobile App Dev', title: 'Build the login screen', dueInDays: 1, done: false },
  { id: 'a2', subject: 'Web Technologies', title: 'Responsive landing page', dueInDays: 3, done: false },
  { id: 'a3', subject: 'Database Systems', title: 'ER diagram for library', dueInDays: 5, done: false },
  { id: 'a4', subject: 'Java Programming', title: 'Bank account class', dueInDays: 7, done: false },
  { id: 'a5', subject: 'Software Engineering', title: 'Write the SRS document', dueInDays: 0, done: true },
];

export const CATEGORIES = ['Bottle', 'Bag', 'Books', 'ID Card', 'Electronics', 'Other'];

// Starting Lost & Found posts. ownerId says which student created the post.
export const initialItems = [
  {
    id: 'l1', type: 'Lost', name: 'Blue water bottle', category: 'Bottle',
    location: 'Library, 2nd floor', description: 'Steel bottle with a small dent.',
    contact: '98765 43210', date: 'Mon Oct 19 2026', ownerId: 'CS2026001', status: 'Active',
  },
  {
    id: 'l2', type: 'Lost', name: 'Black backpack', category: 'Bag',
    location: 'Canteen', description: 'Has a red keychain on the zip.',
    contact: '90000 11111', date: 'Tue Oct 20 2026', ownerId: 'CS2026045', status: 'Active',
  },
  {
    id: 'f1', type: 'Found', name: 'Student ID card', category: 'ID Card',
    location: 'Near Block B gate', description: 'Kept safely at the security desk.',
    contact: '98888 22222', date: 'Wed Oct 21 2026', ownerId: 'CS2026077', status: 'Active',
  },
  {
    id: 'f2', type: 'Found', name: 'Blue bottle', category: 'Bottle',
    location: 'Library entrance', description: 'Found on a study table.',
    contact: '97777 33333', date: 'Thu Oct 22 2026', ownerId: 'CS2026099', status: 'Active',
  },
];
