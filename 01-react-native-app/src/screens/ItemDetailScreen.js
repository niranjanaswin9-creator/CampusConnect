import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

// A small helper: one "Label: value" line.
function Row({ label, value }) {
  return (
    <View style={styles.rowBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function ItemDetailScreen({ route, navigation }) {
  const { items, user, resolveItem, deleteItem } = useApp();
  const item = items.find((i) => i.id === route.params.itemId);

  if (!item) return null; // the post was just deleted
  const isOwner = item.ownerId === user.id;

  const handleResolve = () => {
    resolveItem(item.id);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Delete post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteItem(item.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.badge, { backgroundColor: item.type === 'Lost' ? colors.danger : colors.success }]}>
        {item.type.toUpperCase()}
      </Text>
      <Text style={styles.name}>{item.name}</Text>

      <Row label="Category" value={item.category} />
      <Row label="Place" value={item.location} />
      <Row label="Date posted" value={item.date} />
      <Row label="Description" value={item.description || 'No description'} />
      <Row label="Contact" value={item.contact} />

      {isOwner ? (
        <>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={handleResolve}>
            <Text style={styles.buttonText}>Mark as Resolved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.danger }]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Post</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.note}>Only the student who posted this can resolve or delete it.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background, flexGrow: 1 },
  badge: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  name: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginVertical: 12 },
  rowBox: { backgroundColor: colors.card, borderRadius: 10, padding: 12, marginBottom: 10 },
  label: { fontSize: 12, color: colors.muted },
  value: { fontSize: 16, color: colors.text, marginTop: 2 },
  button: { borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  note: { textAlign: 'center', color: colors.muted, marginTop: 20 },
});
