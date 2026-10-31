import React, { createContext, useContext, useState } from 'react';
import { DEMO_USER, initialAssignments, initialItems } from '../data/mockData';

// A "context" is a shared box of data that every screen can open.
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [users, setUsers] = useState([DEMO_USER]);
  const [user, setUser] = useState(null); // null means "nobody is logged in"
  const [assignments, setAssignments] = useState(initialAssignments);
  const [items, setItems] = useState(initialItems);

  // ---------- account actions ----------
  const login = (id, password) => {
    const found = users.find(
      (u) => u.id.toUpperCase() === id.trim().toUpperCase() && u.password === password
    );
    if (found) setUser(found);
    return Boolean(found);
  };

  // Returns an error message, or '' when registration worked.
  const register = (id, name, password) => {
    if (!id.trim() || !name.trim() || !password) return 'Please fill every field.';
    if (password.length < 6) return 'Password must have at least 6 characters.';
    if (users.some((u) => u.id.toUpperCase() === id.trim().toUpperCase())) {
      return 'This College ID is already registered.';
    }
    const newUser = { id: id.trim().toUpperCase(), name: name.trim(), password };
    setUsers([...users, newUser]);
    setUser(newUser);
    return '';
  };

  const logout = () => setUser(null);

  const updateName = (name) => {
    const changed = { ...user, name };
    setUser(changed);
    setUsers(users.map((u) => (u.id === changed.id ? changed : u)));
  };

  // ---------- assignment action ----------
  const toggleAssignment = (id) =>
    setAssignments((list) => list.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));

  // ---------- Lost & Found actions (Create, Update, Delete) ----------
  const addItem = (item) =>
    setItems((list) => [{ ...item, id: 'i' + Date.now(), ownerId: user.id, status: 'Active' }, ...list]);

  const resolveItem = (id) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status: 'Resolved' } : i)));

  const deleteItem = (id) => setItems((list) => list.filter((i) => i.id !== id));

  const value = {
    user, assignments, items,
    login, register, logout, updateName,
    toggleAssignment, addItem, resolveItem, deleteItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// A small shortcut so screens can write useApp() instead of useContext(AppContext).
export function useApp() {
  return useContext(AppContext);
}
