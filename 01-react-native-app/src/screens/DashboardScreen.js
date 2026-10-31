import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import SummaryCard from '../components/SummaryCard';
import { useApp } from '../context/AppContext';
import { ATTENDANCE_PERCENT, DAYS, timetable } from '../data/mockData';
import { colors } from '../theme';

// "09:30" -> 570 minutes after midnight, so two times can be compared.
const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export default function DashboardScreen({ navigation }) {
  const { user, assignments } = useApp();

  const now = new Date();
  const today = DAYS[(now.getDay() + 6) % 7]; // JS: Sunday = 0, our list starts at Monday
  const todaysClasses = timetable[today];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nextClass = todaysClasses.find((c) => toMinutes(c.start) > nowMinutes);
  const pending = assignments.filter((a) => !a.done).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.hello}>Hello, {user.name.split(' ')[0]}</Text>
      <Text style={styles.date}>{now.toDateString()}</Text>

      <SummaryCard
        title="Today's classes"
        value={todaysClasses.length}
        subtitle={nextClass ? `Next: ${nextClass.subject} at ${nextClass.start}` : 'No more classes today'}
        color={colors.primary}
        onPress={() => navigation.navigate('Timetable')}
      />
      <SummaryCard
        title="Attendance"
        value={`${ATTENDANCE_PERCENT}%`}
        subtitle={ATTENDANCE_PERCENT >= 75 ? 'You are above the 75% limit' : 'Below 75% - attend more classes'}
        color={ATTENDANCE_PERCENT >= 75 ? colors.success : colors.danger}
        onPress={() => {}}
      />
      <SummaryCard
        title="Pending assignments"
        value={pending}
        subtitle="Tap to see the full list"
        color={colors.accent}
        onPress={() => navigation.navigate('Assignments')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  hello: { fontSize: 26, fontWeight: 'bold', color: colors.text },
  date: { fontSize: 14, color: colors.muted, marginBottom: 18 },
});
