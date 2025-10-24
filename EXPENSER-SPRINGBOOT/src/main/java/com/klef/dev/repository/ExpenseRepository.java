package com.klef.dev.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.klef.dev.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    @Query("SELECT e FROM Expense e WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(e.category) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(e.notes) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Expense> searchExpenses(@Param("keyword") String keyword);
}
