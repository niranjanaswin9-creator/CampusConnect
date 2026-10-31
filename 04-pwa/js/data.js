// Sample data (same idea as the mobile app). A real version would load this from a server.
const CAMPUS = {
  studentName: 'Priya Sharma',
  attendancePercent: 82,
  pendingAssignments: 4,
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  timetable: {
    Mon: [
      { subject: 'Mobile App Dev', start: '09:00', end: '10:00', room: 'Lab 2' },
      { subject: 'Web Technologies', start: '10:15', end: '11:15', room: 'Room 101' },
      { subject: 'Database Systems', start: '11:30', end: '12:30', room: 'Room 204' },
    ],
    Tue: [
      { subject: 'Software Engineering', start: '09:00', end: '10:00', room: 'Room 101' },
      { subject: 'Mobile App Dev Lab', start: '10:15', end: '12:15', room: 'Lab 2' },
      { subject: 'Java Programming', start: '14:00', end: '15:00', room: 'Room 305' },
    ],
    Wed: [
      { subject: 'Web Technologies', start: '09:00', end: '10:00', room: 'Room 101' },
      { subject: 'Database Systems', start: '10:15', end: '11:15', room: 'Room 204' },
      { subject: 'Aptitude Training', start: '11:30', end: '12:30', room: 'Hall A' },
    ],
    Thu: [
      { subject: 'Java Programming', start: '09:00', end: '10:00', room: 'Room 305' },
      { subject: 'Software Engineering', start: '10:15', end: '11:15', room: 'Room 101' },
      { subject: 'Mobile App Dev', start: '11:30', end: '12:30', room: 'Lab 2' },
    ],
    Fri: [
      { subject: 'Web Technologies Lab', start: '09:00', end: '11:00', room: 'Lab 1' },
      { subject: 'Database Lab', start: '11:15', end: '13:15', room: 'Lab 3' },
    ],
    Sat: [{ subject: 'Department Seminar', start: '10:00', end: '11:30', room: 'Auditorium' }],
    Sun: [],
  },
};
