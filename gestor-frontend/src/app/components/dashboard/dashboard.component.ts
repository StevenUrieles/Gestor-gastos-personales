import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  loading = false;
  formVisible = false;
  editingExpense: Expense | null = null;
  toast: { message: string; type: 'success' | 'error' } | null = null;
  toastTimer: any;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() { this.loadExpenses(); }

  getTotalAmount(): number {
    return this.expenses.reduce((s, e) => s + Number(e.amount), 0);
  }

  getMonthlyCount(): number {
    const m = new Date().getMonth();
    return this.expenses.filter(e => new Date(e.date).getMonth() === m).length;
  }

  loadExpenses() {
    this.loading = true;
    this.expenseService.getAll().subscribe({
      next: (data) => { this.expenses = data; this.loading = false; },
      error: (err) => { this.showToast(err.message, 'error'); this.loading = false; },
    });
  }

  openNew() { this.editingExpense = null; this.formVisible = true; }
  openEdit(expense: Expense) { this.editingExpense = { ...expense }; this.formVisible = true; }
  closeForm() { this.formVisible = false; this.editingExpense = null; }

  onSave(expense: Expense) {
    if (expense.id) {
      this.expenseService.update(expense.id, expense).subscribe({
        next: (updated) => {
          const idx = this.expenses.findIndex(e => e.id === expense.id);
          if (idx !== -1) this.expenses[idx] = updated;
          this.expenses = [...this.expenses];
          this.closeForm();
          this.showToast('Gasto actualizado correctamente', 'success');
        },
        error: (err) => this.showToast(err.message, 'error'),
      });
    } else {
      this.expenseService.create(expense).subscribe({
        next: (created) => {
          this.expenses = [created, ...this.expenses];
          this.closeForm();
          this.showToast('Gasto registrado correctamente', 'success');
        },
        error: (err) => this.showToast(err.message, 'error'),
      });
    }
  }

  onDelete(id: number) {
    this.expenseService.delete(id).subscribe({
      next: () => { this.expenses = this.expenses.filter(e => e.id !== id); this.showToast('Gasto eliminado', 'success'); },
      error: (err) => this.showToast(err.message, 'error'),
    });
  }

  private showToast(message: string, type: 'success' | 'error') {
    clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.toastTimer = setTimeout(() => (this.toast = null), 3500);
  }
}
