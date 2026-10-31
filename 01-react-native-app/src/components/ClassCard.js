import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// One class in the timetable. It is reused for every class on every day.
export default function ClassCard({ subject, start, end, room }) {
  return (
    <View style={styles.card}>
      <View style={styles.timeBox}>
        <Text style={styles.time}>{start}</Text>
        <Text style={styles.time}>{end}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.room}>{room}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  timeBox: { backgroundColor: colors.primary, padding: 12, justifyContent: 'center' },
  time: { color: '#fff', fontSize: 13, textAlign: 'center' },
  info: { padding: 14, justifyContent: 'center', flex: 1 },
  subject: { fontSize: 16, fontWeight: '600', color: colors.text },
  room: { fontSize: 14, color: colors.muted, marginTop: 2 },
});
