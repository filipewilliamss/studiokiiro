export interface FixedCost {
  id: string;
  name: string;
  value: number;
  sort_order: number;
}

export interface ServicePrice {
  id: string;
  category: string;
  name: string;
  current_price: number;
  target_price: number;
  sort_order: number;
}

export interface MonthlyGoal {
  id: string;
  month: string;
  revenue_goal: number;
  profit_goal: number;
  tax_rate: number;
}

export interface Payment {
  id: string;
  project_id: string;
  budget_total: number;
  initial_payment: number;
  initial_payment_date: string | null;
  remaining_amount: number;
  installments_total: number;
  installments_paid: number;
  next_payment_date: string | null;
  notes: string | null;
  has_commission: boolean;
  commission_rate: number;
  commission_amount: number;
  sale_date: string | null;
  payment_method: string;
  sales_rep: string;
  freelancer_cost: number;
  other_costs: number;
  payment_fees_pct: number;
  payment_fees_amount: number;
  payment_status: string;
  service_price_id: string | null;
  commission_paid_to_partner: boolean;
  commission_paid_date: string | null;
  created_at: string;
  projects?: { name: string; type: string };
}

export interface Profile {
  id: string;
  full_name: string;
  company: string | null;
}

export const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const PAYMENT_METHODS = ["PIX", "Cartão", "Boleto", "Outro"] as const;
export const PAYMENT_STATUSES = ["pendente", "parcialmente_pago", "pago"] as const;

export const statusLabels: Record<string, string> = {
  pendente: "Pendente",
  parcialmente_pago: "Parcialmente pago",
  pago: "Pago",
};
