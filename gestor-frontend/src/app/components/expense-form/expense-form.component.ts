import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Expense,
  CategoryEnum,
  PaymentMethodEnum,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  PAYMENT_LABELS,
  PAYMENT_ICONS,
} from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent implements OnInit, OnChanges {
  @Input() expense: Expense | null = null;
  @Input() visible = false;
  @Output() save = new EventEmitter<Expense>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isEdit = false;
  submitting = false;

  categories: { value: CategoryEnum; label: string; icon: string }[] = [];
  paymentMethods: { value: PaymentMethodEnum; label: string; icon: string }[] = [];

  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.categories = (Object.keys(CATEGORY_LABELS) as CategoryEnum[]).map((k) => ({
      value: k,
      label: CATEGORY_LABELS[k],
      icon: CATEGORY_ICONS[k],
    }));

    this.paymentMethods = (Object.keys(PAYMENT_LABELS) as PaymentMethodEnum[]).map((k) => ({
      value: k,
      label: PAYMENT_LABELS[k],
      icon: PAYMENT_ICONS[k],
    }));

    this.buildForm();
  }

  ngOnChanges() {
    if (this.form) {
      this.isEdit = !!this.expense;
      if (this.expense) {
        this.form.patchValue(this.expense);
      } else {
        this.form.reset({ date: this.today });
      }
    }
  }

  private buildForm() {
    this.isEdit = !!this.expense;
    this.form = this.fb.group({
      description: [this.expense?.description || '', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      amount: [this.expense?.amount || null, [Validators.required, Validators.min(0.01)]],
      category: [this.expense?.category || null, Validators.required],
      date: [this.expense?.date || this.today, Validators.required],
      paymentMethod: [this.expense?.paymentMethod || null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const value: Expense = {
      ...this.form.value,
      ...(this.expense?.id ? { id: this.expense.id } : {}),
    };
    this.save.emit(value);
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset({ date: this.today });
  }

  hasError(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }
}
