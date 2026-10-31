import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ClassCard from '../components/ClassCard';
import { DAYS, timetable } from '../data/mockData';
import { colors } from '../theme';

export default function TimetableScreen() {
  const todayName = DAYS[(new Date().getDay() + 6) % 7];
  const [selectedDay, setSelectedDay] = useState(todayName); // the chosen day tab

  return (
    <View style={styles.container}>
      <View style={styles.dayRow}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, selectedDay === day && styles.dayButtonActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={timetable[selectedDay]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ClassCard subject={item.subject} start={item.start} end={item.end} room={item.room} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No classes on {selectedDay}. Enjoy your day!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  dayRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: colors.card },
  dayButton: { paddingVertical: 8, paddingHorizontal: 9, borderRadius: 16 },
  dayButtonActive: { backgroundColor: colors.accent },
  dayText: { fontSize: 14, color: colors.text },
  dayTextActive: { color: '#fff', fontWeight: '600' },
  list: { padding: 16 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40, fontSize: 16 },
});
