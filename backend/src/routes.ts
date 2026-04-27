import { Router } from 'express';
import { createExpenseSchema } from './schemas';
import { getDb, runDb, allDb } from './db';

export const expensesRouter = Router();

expensesRouter.post('/', async (req, res) => {
  try {
    const validatedData = createExpenseSchema.parse(req.body);
    const idempotencyKey = req.headers['x-idempotency-key'] as string | undefined;

    if (idempotencyKey) {
      const existingExpense = await getDb('SELECT * FROM expenses WHERE idempotency_key = ?', [idempotencyKey]);
      if (existingExpense) {
        res.status(200).json({ message: "Expense already created", data: existingExpense });
        return;
      }
    }
    
    const result = await runDb(
      `INSERT INTO expenses (amount, category, description, date, idempotency_key) VALUES (?, ?, ?, ?, ?)`,
      [validatedData.amount, validatedData.category, validatedData.description || null, validatedData.date, idempotencyKey || null]
    );

    const newExpense = await getDb('SELECT * FROM expenses WHERE id = ?', [result.lastID]);
    
    res.status(201).json({ data: newExpense });
  } catch (error) {
    res.status(400).json({ error: "Validation failed", details: error });
  }
});

expensesRouter.get('/', async (req, res) => {
  try {
    const { category, sort } = req.query;
    
    let query = 'SELECT * FROM expenses';
    const params: any[] = [];
    
    if (category && typeof category === 'string') {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    if (sort === 'date_desc') {
      query += ' ORDER BY date DESC, id DESC';
    } else {
      query += ' ORDER BY id DESC';
    }

    const expenses = await allDb(query, params);
    res.status(200).json({ data: expenses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});
