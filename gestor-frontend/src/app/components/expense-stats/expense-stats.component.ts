import { Component, Input, OnChanges } from '@angular/core';
import { Expense, CATEGORY_COLORS, CategoryEnum } from '../../models/expense.model';

interface StatCard { label: string; value: string; icon: string; color: string; }
interface CategoryStat { category: CategoryEnum; label: string; total: number; count: number; color: string; percent: number; }

@Component({
  selector: 'app-expense-stats',
  templateUrl: './expense-stats.component.html',
  styleUrls: ['./expense-stats.component.scss'],
})
export class ExpenseStatsComponent implements OnChanges {
  @Input() expenses: Expense[] = [];

  stats: StatCard[] = [];
  categoryStats: CategoryStat[] = [];

  private readonly catLabels: Record<string, string> = {
    FOOD:'Alimentación', TRANSPORT:'Transporte', ENTERTAINMENT:'Entretenimiento',
    HEALTH:'Salud', EDUCATION:'Educación', UTILITIES:'Servicios',
    SHOPPING:'Compras', OTHER:'Otro',
  };

  ngOnChanges() { this.compute(); }

  private compute() {
    if (!this.expenses.length) { this.stats = []; this.categoryStats = []; return; }

    const total = this.expenses.reduce((s,e) => s + Number(e.amount), 0);
    const avg = total / this.expenses.length;
    const max = Math.max(...this.expenses.map(e => Number(e.amount)));
    const m = new Date().getMonth();
    const monthly = this.expenses.filter(e => new Date(e.date).getMonth() === m).reduce((s,e) => s + Number(e.amount), 0);

    this.stats = [
      { label:'Total Gastado', value: this.fmt(total), icon:'◈', color:'#dc2626' },
      { label:'Este Mes',      value: this.fmt(monthly), icon:'◉', color:'#22c55e' },
      { label:'Promedio',      value: this.fmt(avg), icon:'◎', color:'#f97316' },
      { label:'Mayor Gasto',   value: this.fmt(max), icon:'◆', color:'#a855f7' },
    ];

    const grouped: Record<string,{total:number;count:number}> = {};
    this.expenses.forEach(e => {
      if (!grouped[e.category]) grouped[e.category] = { total:0, count:0 };
      grouped[e.category].total += Number(e.amount);
      grouped[e.category].count++;
    });

    this.categoryStats = Object.entries(grouped).map(([cat, d]) => ({
      category: cat as CategoryEnum,
      label: this.catLabels[cat] || cat,
      total: d.total, count: d.count,
      color: (CATEGORY_COLORS as Record<string,string>)[cat] || '#94a3b8',
      percent: Math.round((d.total / total) * 100),
    })).sort((a,b) => b.total - a.total).slice(0,5);
  }

  private fmt(n: number): string {
    return new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 }).format(n);
  }
}
