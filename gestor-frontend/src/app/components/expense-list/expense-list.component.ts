import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  Expense,
  CategoryEnum,
  PaymentMethodEnum,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  PAYMENT_LABELS,
  PAYMENT_ICONS,
} from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] = [];
  @Input() loading = false;
  @Output() edit = new EventEmitter<Expense>();
  @Output() delete = new EventEmitter<number>();

  filterCategory: string = 'ALL';
  filterDate: string = '';
  sortField: 'date' | 'amount' = 'date';
  sortDesc = true;
  confirmDeleteId: number | null = null;
  today = new Date().toISOString().split('T')[0];

  readonly allCategories = ['ALL', ...Object.keys(CATEGORY_LABELS)] as const;

  get filtered(): Expense[] {
    let list = [...this.expenses];
    if (this.filterCategory !== 'ALL') list = list.filter(e => e.category === this.filterCategory);
    if (this.filterDate) list = list.filter(e => e.date === this.filterDate);
    list.sort((a, b) => {
      const va = this.sortField === 'date' ? new Date(a.date).getTime() : Number(a.amount);
      const vb = this.sortField === 'date' ? new Date(b.date).getTime() : Number(b.amount);
      return this.sortDesc ? vb - va : va - vb;
    });
    return list;
  }

  getCategoryLabel(c: string): string { return (CATEGORY_LABELS as Record<string,string>)[c] || c; }
  getCategoryIcon(c: string): string { return (CATEGORY_ICONS as Record<string,string>)[c] || '📦'; }
  getCategoryColor(c: string): string { return (CATEGORY_COLORS as Record<string,string>)[c] || '#94a3b8'; }
  getPaymentLabel(p: string): string { return (PAYMENT_LABELS as Record<string,string>)[p] || p; }

  getTotal(): number { return this.filtered.reduce((s, e) => s + Number(e.amount), 0); }

  toggleSort(field: 'date' | 'amount') {
    if (this.sortField === field) this.sortDesc = !this.sortDesc;
    else { this.sortField = field; this.sortDesc = true; }
  }

  confirmDelete(id: number) { this.confirmDeleteId = id; }
  cancelDelete() { this.confirmDeleteId = null; }
  doDelete(id: number) { this.delete.emit(id); this.confirmDeleteId = null; }
  clearFilters() { this.filterCategory = 'ALL'; this.filterDate = ''; }
  trackById(_: number, e: Expense) { return e.id; }
}
