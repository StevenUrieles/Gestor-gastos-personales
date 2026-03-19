import { Component, OnInit } from '@angular/core';
import { Expense, CATEGORY_LABELS, CATEGORY_COLORS } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

interface CatStat { label: string; total: number; count: number; color: string; percent: number; }
interface MonthStat { month: string; total: number; count: number; bar: number; }

@Component({
  selector: 'app-reportes-view',
  templateUrl: './reportes-view.component.html',
  styleUrls: ['./reportes-view.component.scss'],
})
export class ReportesViewComponent implements OnInit {
  expenses: Expense[] = [];
  loading = false;
  catStats: CatStat[] = [];
  monthStats: MonthStat[] = [];
  topExpense: Expense | null = null;

  private readonly MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  constructor(private svc: ExpenseService) {}

  ngOnInit() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: d => { this.expenses = d; this.compute(); this.loading = false; },
      error: () => this.loading = false,
    });
  }

  get total(): number  { return this.expenses.reduce((s,e) => s + Number(e.amount), 0); }
  get avg(): number    { return this.expenses.length ? this.total / this.expenses.length : 0; }
  get maxAmt(): number { return this.expenses.length ? Math.max(...this.expenses.map(e => Number(e.amount))) : 0; }

  getTop5(): Expense[] {
    return [...this.expenses].sort((a,b) => Number(b.amount) - Number(a.amount)).slice(0,5);
  }

  private compute() {
    if (!this.expenses.length) return;

    const grouped: Record<string,{total:number;count:number}> = {};
    this.expenses.forEach(e => {
      if (!grouped[e.category]) grouped[e.category] = {total:0,count:0};
      grouped[e.category].total += Number(e.amount);
      grouped[e.category].count++;
    });
    const t = this.total;
    this.catStats = Object.entries(grouped).map(([cat,d]) => ({
      label: (CATEGORY_LABELS as Record<string,string>)[cat] || cat,
      total: d.total, count: d.count,
      color: (CATEGORY_COLORS as Record<string,string>)[cat] || '#94a3b8',
      percent: Math.round((d.total/t)*100),
    })).sort((a,b) => b.total - a.total);

    const monthly: Record<number,{total:number;count:number}> = {};
    this.expenses.forEach(e => {
      const m = new Date(e.date).getMonth();
      if (!monthly[m]) monthly[m] = {total:0,count:0};
      monthly[m].total += Number(e.amount);
      monthly[m].count++;
    });
    const maxM = Math.max(...Object.values(monthly).map(v => v.total));
    this.monthStats = Object.entries(monthly)
      .map(([m, v]) => ({
        month: this.MONTH_NAMES[+m],
        total: v.total, count: v.count,
        bar: maxM > 0 ? Math.round((v.total/maxM)*100) : 0,
      }))
      .sort((a,b) => this.MONTH_NAMES.indexOf(a.month) - this.MONTH_NAMES.indexOf(b.month));

    this.topExpense = this.expenses.reduce((p,c) => Number(c.amount) > Number(p.amount) ? c : p, this.expenses[0]);
  }
}
