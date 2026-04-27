import { Router } from 'express';
import { createExpenseSchema } from './schemas';
import { getDb } from './db';

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
    
    res.status(201).json({ message: "Scaffold successful", data: validatedData });
  } catch (error) {
    res.status(400).json({ error: "Validation failed", details: error });
  }
});
