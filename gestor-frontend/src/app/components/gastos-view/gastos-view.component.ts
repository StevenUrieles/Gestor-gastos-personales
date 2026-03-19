import { Component, OnInit } from '@angular/core';
import { Expense, CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS, PAYMENT_LABELS } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-gastos-view',
  templateUrl: './gastos-view.component.html',
  styleUrls: ['./gastos-view.component.scss'],
})
export class GastosViewComponent implements OnInit {
  expenses: Expense[] = [];
  loading = false;
  formVisible = false;
  editingExpense: Expense | null = null;
  toast: { message: string; type: 'success' | 'error' } | null = null;
  toastTimer: any;

  constructor(private svc: ExpenseService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: d => { this.expenses = d; this.loading = false; },
      error: e => { this.showToast(e.message, 'error'); this.loading = false; },
    });
  }

  getTotalFn(): number {
    return this.expenses.reduce((s, e) => s + Number(e.amount), 0);
  }

  openNew() { this.editingExpense = null; this.formVisible = true; }
  openEdit(e: Expense) { this.editingExpense = { ...e }; this.formVisible = true; }
  closeForm() { this.formVisible = false; this.editingExpense = null; }

  onSave(expense: Expense) {
    const op$ = expense.id ? this.svc.update(expense.id, expense) : this.svc.create(expense);
    op$.subscribe({
      next: (saved) => {
        if (expense.id) {
          const i = this.expenses.findIndex(e => e.id === expense.id);
          if (i !== -1) this.expenses[i] = saved;
          this.expenses = [...this.expenses];
        } else {
          this.expenses = [saved, ...this.expenses];
        }
        this.closeForm();
        this.showToast(expense.id ? 'Gasto actualizado' : 'Gasto registrado', 'success');
      },
      error: e => this.showToast(e.message, 'error'),
    });
  }

  onDelete(id: number) {
    this.svc.delete(id).subscribe({
      next: () => { this.expenses = this.expenses.filter(e => e.id !== id); this.showToast('Eliminado', 'success'); },
      error: e => this.showToast(e.message, 'error'),
    });
  }

  getCategoryLabel(c: string): string { return (CATEGORY_LABELS as Record<string,string>)[c] || c; }
  getCategoryIcon(c: string): string  { return (CATEGORY_ICONS as Record<string,string>)[c] || '📦'; }
  getCategoryColor(c: string): string { return (CATEGORY_COLORS as Record<string,string>)[c] || '#94a3b8'; }
  getPaymentLabel(p: string): string  { return (PAYMENT_LABELS as Record<string,string>)[p] || p; }

  trackById(_: number, e: Expense) { return e.id; }

  private showToast(message: string, type: 'success' | 'error') {
    clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.toastTimer = setTimeout(() => this.toast = null, 3500);
  }
}
