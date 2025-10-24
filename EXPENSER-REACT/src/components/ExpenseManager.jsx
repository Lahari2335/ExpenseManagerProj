import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './style.css';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState({ title: '', category: '', amount: '', date: '', notes: '' });
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const baseUrl = `${import.meta.env.VITE_API_URL}/expenseapi`;

  // ✅ Wrap in useCallback so it can be safely used in useEffect
  const fetchAllExpenses = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setExpenses(res.data);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch expenses.');
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchAllExpenses();
  }, [fetchAllExpenses]);

  const handleChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

  const validateForm = () => {
    for (let key in expense) {
      if (!expense[key] || expense[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addExpense = async () => {
    if (!validateForm()) return;
    try {
      if (editingId) {
        await axios.put(`${baseUrl}/edit/${editingId}`, expense);
        setMessage('Expense updated successfully!');
      } else {
        await axios.post(`${baseUrl}/add`, expense);
        setMessage('Expense added successfully!');
      }
      resetForm();
      fetchAllExpenses();
    } catch (error) {
      console.error(error);
      setMessage('Failed to save expense.');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage('Expense deleted successfully!');
      fetchAllExpenses();
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete expense.');
    }
  };

  const handleEdit = (exp) => {
    setExpense(exp);
    setEditingId(exp.id);
  };

  const resetForm = () => {
    setExpense({ title: '', category: '', amount: '', date: '', notes: '' });
    setEditingId(null);
  };

  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    if (!keyword.trim()) {
      fetchAllExpenses();
      return;
    }
    try {
      const res = await axios.get(`${baseUrl}/search?keyword=${keyword}`);
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
      setMessage('Search failed.');
    }
  };

  return (
    <div className="container">
      <h1>Expense Manager</h1>
      <input
        type="text"
        placeholder="Search by title, category, or notes"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="form">
        <input type="text" name="title" placeholder="Title" value={expense.title} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={expense.category} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
        <input type="date" name="date" value={expense.date} onChange={handleChange} />
        <input type="text" name="notes" placeholder="Notes" value={expense.notes} onChange={handleChange} />
        <button onClick={addExpense}>{editingId ? 'Update Expense' : 'Add Expense'}</button>
      </div>

      {message && <p className="message">{message}</p>}

      <h2>All Expenses</h2>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((exp) => (
            <li key={exp.id}>
              <strong>{exp.title}</strong> : {exp.amount}/- ({exp.category}) on {exp.date}
              <button onClick={() => handleEdit(exp)}>Edit</button>
              <button onClick={() => deleteExpense(exp.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No expenses found.</p>
        )}
      </ul>
    </div>
  );
};

export default ExpenseManager;

