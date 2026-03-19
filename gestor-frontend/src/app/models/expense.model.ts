export type CategoryEnum =
  | 'FOOD'
  | 'TRANSPORT'
  | 'ENTERTAINMENT'
  | 'HEALTH'
  | 'EDUCATION'
  | 'UTILITIES'
  | 'SHOPPING'
  | 'OTHER';

export type PaymentMethodEnum =
  | 'CASH'
  | 'DEBIT_CARD'
  | 'CREDIT_CARD'
  | 'BANK_TRANSFER'
  | 'DIGITAL_WALLET';

export interface Expense {
  id?: number;
  description: string;
  amount: number;
  category: CategoryEnum;
  date: string;
  paymentMethod: PaymentMethodEnum;
}

export const CATEGORY_LABELS: Record<CategoryEnum, string> = {
  FOOD: 'Alimentación',
  TRANSPORT: 'Transporte',
  ENTERTAINMENT: 'Entretenimiento',
  HEALTH: 'Salud',
  EDUCATION: 'Educación',
  UTILITIES: 'Servicios',
  SHOPPING: 'Compras',
  OTHER: 'Otro',
};

export const CATEGORY_ICONS: Record<CategoryEnum, string> = {
  FOOD: '🍔',
  TRANSPORT: '🚌',
  ENTERTAINMENT: '🎬',
  HEALTH: '💊',
  EDUCATION: '📚',
  UTILITIES: '💡',
  SHOPPING: '🛍️',
  OTHER: '📦',
};

export const CATEGORY_COLORS: Record<CategoryEnum, string> = {
  FOOD: '#f97316',
  TRANSPORT: '#3b82f6',
  ENTERTAINMENT: '#a855f7',
  HEALTH: '#22c55e',
  EDUCATION: '#eab308',
  UTILITIES: '#06b6d4',
  SHOPPING: '#ec4899',
  OTHER: '#94a3b8',
};

export const PAYMENT_LABELS: Record<PaymentMethodEnum, string> = {
  CASH: 'Efectivo',
  DEBIT_CARD: 'Tarjeta Débito',
  CREDIT_CARD: 'Tarjeta Crédito',
  BANK_TRANSFER: 'Transferencia',
  DIGITAL_WALLET: 'Billetera Digital',
};

export const PAYMENT_ICONS: Record<PaymentMethodEnum, string> = {
  CASH: '💵',
  DEBIT_CARD: '💳',
  CREDIT_CARD: '💳',
  BANK_TRANSFER: '🏦',
  DIGITAL_WALLET: '📱',
};
