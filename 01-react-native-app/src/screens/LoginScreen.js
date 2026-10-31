import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function LoginScreen() {
  const { login, register } = useApp();
  const [isRegister, setIsRegister] = useState(false); // false = login form, true = register form
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (isRegister) {
      setError(register(id, name, password)); // '' means success
    } else if (!login(id, password)) {
      setError('Incorrect ID or password, please try again');
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setError('');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.brand}>CampusConnect</Text>
      <Text style={styles.tagline}>Your whole college day, in one app</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>{isRegister ? 'Create account' : 'Student login'}</Text>

        <TextInput
          style={styles.input}
          placeholder="College ID"
          autoCapitalize="characters"
          value={id}
          onChangeText={setId}
        />
        {isRegister && (
          <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
        )}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Log in'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={switchMode}>
          <Text style={styles.link}>
            {isRegister ? 'Already have an account? Log in' : 'New student? Register here'}
          </Text>
        </TouchableOpacity>

        {!isRegister && <Text style={styles.hint}>Demo: CS2026001 / student123</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', padding: 24 },
  brand: { fontSize: 34, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  tagline: { fontSize: 15, color: '#CBD5E1', textAlign: 'center', marginBottom: 28 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 20 },
  heading: { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  error: { color: colors.danger, marginBottom: 10 },
  button: { backgroundColor: colors.accent, borderRadius: 10, padding: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { color: colors.accent, textAlign: 'center', marginTop: 16 },
  hint: { color: colors.muted, textAlign: 'center', marginTop: 12, fontSize: 12 },
});
