import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { DEPARTMENT } from '../data/mockData';
import { colors } from '../theme';

export default function ProfileScreen() {
  const { user, updateName, logout } = useApp();
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      updateName(name.trim());
      setSaved(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.id}>{user.id}</Text>
      <Text style={styles.dept}>{DEPARTMENT}</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setSaved(false);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save changes</Text>
      </TouchableOpacity>
      {saved && <Text style={styles.saved}>Saved!</Text>}

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  avatarText: { color: '#fff', fontSize: 38, fontWeight: 'bold' },
  id: { textAlign: 'center', fontSize: 18, fontWeight: '600', color: colors.text, marginTop: 12 },
  dept: { textAlign: 'center', color: colors.muted, marginBottom: 24 },
  label: { fontSize: 14, color: colors.muted, marginBottom: 6 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  button: { backgroundColor: colors.accent, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  saved: { textAlign: 'center', color: colors.success, marginTop: 8 },
  logout: { backgroundColor: colors.danger, marginTop: 40 },
});
