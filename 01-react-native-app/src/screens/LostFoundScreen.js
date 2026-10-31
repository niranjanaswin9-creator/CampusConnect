import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemCard from '../components/ItemCard';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function LostFoundScreen({ navigation }) {
  const { items } = useApp();
  const [tab, setTab] = useState('Lost'); // which list is showing: 'Lost' or 'Found'

  // Show only posts of the chosen type that are still open (not Resolved).
  const visible = items.filter((i) => i.type === tab && i.status === 'Active');

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {['Lost', 'Found'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t} Items</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No {tab.toLowerCase()} items right now.</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('ReportItem')}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabs: { flexDirection: 'row', backgroundColor: colors.card },
  tab: { flex: 1, padding: 14, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.accent },
  tabText: { fontSize: 15, color: colors.muted },
  tabTextActive: { color: colors.accent, fontWeight: '600' },
  list: { padding: 16, paddingBottom: 90 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40, fontSize: 16 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
