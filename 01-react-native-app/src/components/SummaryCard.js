import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

// A reusable card. The screen gives it "props": title, value, subtitle, colour, onPress.
export default function SummaryCard({ title, value, subtitle, color, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderLeftWidth: 6,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  title: { fontSize: 14, color: colors.muted },
  value: { fontSize: 34, fontWeight: 'bold', marginVertical: 4 },
  subtitle: { fontSize: 14, color: colors.text },
});
