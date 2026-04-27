import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string | null;
  date: string;
  idempotency_key: string | null;
  created_at: string;
};

export type CreateExpensePayload = {
  amount: number;
  category: string;
  description?: string;
  date: string;
};

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchExpenses = async (category?: string, sort?: string): Promise<Expense[]> => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (sort) params.append('sort', sort);
  
  const response = await api.get(`/expenses?${params.toString()}`);
  return response.data.data;
};

export const createExpense = async (payload: CreateExpensePayload): Promise<Expense> => {
  const idempotencyKey = uuidv4();
  const response = await api.post('/expenses', payload, {
    headers: {
      'x-idempotency-key': idempotencyKey
    }
  });
  return response.data.data;
};
