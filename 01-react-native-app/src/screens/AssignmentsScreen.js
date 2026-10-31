import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

const dueText = (days) => {
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `Due in ${days} days`;
};

export default function AssignmentsScreen() {
  const { assignments, toggleAssignment } = useApp();

  return (
    <FlatList
      data={assignments}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const urgent = !item.done && item.dueInDays <= 2; // due within 2 days: show in red
        return (
          <TouchableOpacity
            style={[styles.row, urgent && styles.urgentRow]}
            onPress={() => toggleAssignment(item.id)}
          >
            <Ionicons
              name={item.done ? 'checkbox' : 'square-outline'}
              size={28}
              color={item.done ? colors.success : colors.muted}
            />
            <View style={styles.info}>
              <Text style={[styles.title, item.done && styles.doneText]}>{item.title}</Text>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={[styles.due, urgent && { color: colors.danger }]}>{dueText(item.dueInDays)}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  urgentRow: { borderWidth: 1.5, borderColor: colors.danger },
  info: { marginLeft: 14, flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: colors.text },
  doneText: { textDecorationLine: 'line-through', color: colors.muted },
  subject: { fontSize: 14, color: colors.muted, marginTop: 2 },
  due: { fontSize: 13, color: colors.accent, marginTop: 4 },
});
