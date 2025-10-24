package com.klef.dev.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.entity.Expense;
import com.klef.dev.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    public Expense addExpense(Expense expense) {
        return repository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public Expense updateExpense(Expense expense) {
        return repository.save(expense);
    }

    public void deleteExpense(int id) {
        repository.deleteById(id);
    }

    public List<Expense> searchExpenses(String keyword) {
        return repository.searchExpenses(keyword);
    }
}
