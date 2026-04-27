import React from 'react';
import { Wallet } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          background: 'var(--primary-color)',
          padding: '0.75rem',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
        }}>
          <Wallet color="white" size={28} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Expense Tracker</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            Understand exactly where your money goes.
          </p>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};
