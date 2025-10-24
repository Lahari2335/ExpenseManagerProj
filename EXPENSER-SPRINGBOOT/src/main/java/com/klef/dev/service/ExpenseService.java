package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Expense;

public interface ExpenseService {
    Expense addExpense(Expense expense);
    List<Expense> getAllExpenses();
    Expense updateExpense(Expense expense);
    void deleteExpense(int id);
    List<Expense> searchExpenses(String keyword);
}
