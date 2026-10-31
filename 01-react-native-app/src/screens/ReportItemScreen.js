import React, { useState } from 'react';
import { Text, TextInput, ScrollView, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { colors } from '../theme';

export default function ReportItemScreen({ navigation }) {
  const { addItem } = useApp();
  const [type, setType] = useState('Lost');
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !location.trim() || !contact.trim()) {
      Alert.alert('Missing details', 'Please fill the item name, place and contact number.');
      return;
    }
    addItem({
      type,
      name: name.trim(),
      category,
      location: location.trim(),
      description: description.trim(),
      contact: contact.trim(),
      date: new Date().toDateString(),
    });
    Alert.alert('Posted!', 'Your post is now visible to every student.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  // Draws a row of tappable "chips" (small rounded buttons) for choosing one option.
  const renderChips = (options, selected, onSelect) => (
    <View style={styles.chipRow}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.chip, selected === option && styles.chipActive]}
          onPress={() => onSelect(option)}
        >
          <Text style={[styles.chipText, selected === option && styles.chipTextActive]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>What are you reporting?</Text>
      {renderChips(['Lost', 'Found'], type, setType)}

      <Text style={styles.label}>Item name</Text>
      <TextInput style={styles.input} placeholder="e.g. Blue water bottle" value={name} onChangeText={setName} />

      <Text style={styles.label}>Category</Text>
      {renderChips(CATEGORIES, category, setCategory)}

      <Text style={styles.label}>Where was it {type.toLowerCase()}?</Text>
      <TextInput style={styles.input} placeholder="e.g. Library, 2nd floor" value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Description (optional)</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Colour, size, marks..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Your contact number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background, flexGrow: 1 },
  label: { fontSize: 14, color: colors.muted, marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  multiline: { height: 90, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: colors.accent },
  chipText: { color: colors.accent },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  button: { backgroundColor: colors.accent, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
