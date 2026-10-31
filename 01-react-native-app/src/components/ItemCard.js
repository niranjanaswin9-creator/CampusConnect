import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

// One Lost & Found post shown as a card in the list.
export default function ItemCard({ item, onPress }) {
  const tagColor = item.type === 'Lost' ? colors.danger : colors.success;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.tag, { backgroundColor: tagColor }]}>{item.type}</Text>
      </View>
      <Text style={styles.line}>{item.category} - {item.location}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 17, fontWeight: '600', color: colors.text, flex: 1 },
  tag: { color: '#fff', fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  line: { fontSize: 14, color: colors.text, marginTop: 6 },
  date: { fontSize: 12, color: colors.muted, marginTop: 4 },
});
