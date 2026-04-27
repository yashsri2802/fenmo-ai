import React, { useState } from 'react';
import type { CreateExpensePayload } from '../api';

type Props = {
  onSubmit: (payload: CreateExpensePayload) => void;
  isLoading: boolean;
};

const CATEGORIES = ['Groceries', 'Housing', 'Entertainment', 'Utilities', 'Transportation', 'Food', 'Other'];

export const ExpenseForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    onSubmit({
      amount: Math.round(Number(amount) * 100),
      category,
      description,
      date
    });
    
    setAmount('');
    setDescription('');
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '1.2rem', fontSize: '1.1rem' }}>Add New Expense</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Amount (₹)</label>
          <input 
            type="number" 
            step="0.01"
            min="0"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            required
            disabled={isLoading}
            style={{ 
              padding: '0.75rem', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading}
            style={{ 
              padding: '0.75rem', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)'
            }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={isLoading}
            style={{ 
              padding: '0.75rem', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Description</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            style={{ 
              padding: '0.75rem', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              background: 'var(--primary-color)', 
              color: 'white', 
              padding: '0.75rem 2rem', 
              borderRadius: '8px',
              fontWeight: 600,
              opacity: isLoading ? 0.7 : 1,
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary-color)'}
          >
            {isLoading ? 'Saving...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};
