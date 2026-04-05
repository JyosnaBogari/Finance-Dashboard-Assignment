import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction, TransactionType, mockTransactions } from "@/data/mockData";

export type Role = "admin" | "viewer";
export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  searchQuery: string;
  filterType: TransactionType | "all";
  sortField: SortField;
  sortOrder: SortOrder;

  setRole: (role: Role) => void;
  setSearchQuery: (q: string) => void;
  setFilterType: (f: TransactionType | "all") => void;
  setSortField: (f: SortField) => void;
  setSortOrder: (o: SortOrder) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
}

export const useStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: "admin",
      searchQuery: "",
      filterType: "all",
      sortField: "date",
      sortOrder: "desc",

      setRole: (role) => set({ role }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterType: (filterType) => set({ filterType }),
      setSortField: (sortField) => set({ sortField }),
      setSortOrder: (sortOrder) => set({ sortOrder }),

      addTransaction: (t) =>
        set((s) => ({
          transactions: [
            ...s.transactions,
            { ...t, id: crypto.randomUUID() },
          ],
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
    }),
    { name: "finance-dashboard" }
  )
);

export interface MonthlySummary {
  income: number;
  expenses: number;
  savings: number;
  categoryTotals: Record<string, number>;
}

export function getFilteredTransactions(
  transactions: Transaction[],
  searchQuery: string,
  filterType: TransactionType | "all",
  sortField: SortField,
  sortOrder: SortOrder
) {
  let filtered = [...transactions];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }

  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  filtered.sort((a, b) => {
    const mult = sortOrder === "asc" ? 1 : -1;
    if (sortField === "date") {
      return mult * (new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return mult * (a.amount - b.amount);
  });

  return filtered;
}

export function getTotalIncome(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions: Transaction[]) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

export function getTransactionsForMonth(
  transactions: Transaction[],
  month: number,
  year: number
) {
  return transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
}

export function getMonthlySummary(
  transactions: Transaction[],
  month: number,
  year: number
): MonthlySummary {
  const monthly = getTransactionsForMonth(transactions, month, year);

  const income = monthly
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = monthly
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = monthly.reduce<Record<string, number>>((acc, transaction) => {
    if (transaction.type === "expense") {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  return {
    income,
    expenses,
    savings: income - expenses,
    categoryTotals,
  };
}
