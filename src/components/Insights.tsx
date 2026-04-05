import { useMemo } from "react";
import { TrendingUp, TrendingDown, PiggyBank, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  getMonthlySummary,
  getTransactionsForMonth,
  getTotalExpenses,
  getTotalIncome,
} from "@/store/useStore";
import { useStore } from "@/store/useStore";

const Insights = () => {
  const transactions = useStore((s) => s.transactions);

  const insights = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const currentSummary = getMonthlySummary(transactions, month, year);

    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;
    const previousSummary = getMonthlySummary(transactions, previousMonth, previousYear);

    const categoryTotals = currentSummary.categoryTotals;
    const topExpenseCategory = Object.entries(categoryTotals).reduce(
      (best, [category, amount]) => (amount > best.amount ? { category, amount } : best),
      { category: "None", amount: 0 }
    );

    const expenseChange = previousSummary.expenses > 0
      ? ((currentSummary.expenses - previousSummary.expenses) / previousSummary.expenses) * 100
      : 0;

    const comparisons = Object.entries(categoryTotals).map(([category, amount]) => {
      const lastAmount = previousSummary.categoryTotals[category] || 0;
      if (lastAmount < 1) return null;
      const change = Math.round(((amount - lastAmount) / lastAmount) * 100);
      if (Math.abs(change) < 10) return null;
      return `You spent ${Math.abs(change)}% ${change > 0 ? "more" : "less"} on ${category}`;
    }).filter(Boolean) as string[];

    return {
      saved: currentSummary.savings,
      thisExpenses: currentSummary.expenses,
      thisIncome: currentSummary.income,
      topExpenseCategory,
      expenseChange: Math.round(expenseChange),
      comparisons,
      monthLabel: now.toLocaleString("default", { month: "long" }),
      transactionCount: getTransactionsForMonth(transactions, month, year).length,
    };
  }, [transactions]);

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Insights</CardTitle>
        <CardDescription className="mt-1 text-slate-500">
          A quick view of your current month progress and savings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:bg-slate-100">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <PiggyBank className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Savings</p>
                <p className="mt-2 text-3xl font-semibold">
                  ${insights.saved.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {insights.saved >= 0
                ? `You saved ${insights.monthLabel} by keeping expenses lower than income.`
                : `Expenses exceeded income this month. Try reviewing your categories.`}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">This month</p>
                  <p className="mt-2 text-2xl font-semibold">${insights.thisIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-[rgb(156,196,184)]" />
              </div>
              <p className="mt-3 text-sm text-slate-600">Income recorded for the current month.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Expense trend</p>
                  <p className="mt-2 text-2xl font-semibold">{insights.expenseChange >= 0 ? "+" : ""}{insights.expenseChange}%</p>
                </div>
                <TrendingDown className="h-6 w-6 text-[rgb(253,187,116)]" />
              </div>
              <p className="mt-3 text-sm text-slate-600">
                {insights.expenseChange >= 0 ? "Spend has increased from last month." : "You reduced spending since last month."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-slate-700" />
              <p className="text-sm font-medium text-slate-800">Top Expense</p>
            </div>
            <p className="mt-3 text-xl font-semibold text-slate-900">{insights.topExpenseCategory.category}</p>
            <p className="mt-1 text-sm text-slate-600">
              ${insights.topExpenseCategory.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-[rgb(156,196,184)]" />
              <p className="text-sm font-medium text-slate-800">Spent this month</p>
            </div>
            <p className="mt-3 text-xl font-semibold text-slate-900">
              ${insights.thisExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-sm text-slate-600">Across {insights.transactionCount} transactions this month.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-5 w-5 text-[rgb(253,187,116)]" />
              <p className="text-sm font-medium text-slate-800">Category notes</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {insights.comparisons.length > 0 ? (
                insights.comparisons.map((note, index) => (
                  <p key={index} className="rounded-2xl bg-white p-3 shadow-sm">{note}</p>
                ))
              ) : (
                <p className="rounded-2xl bg-white p-3 shadow-sm">No major category shifts this month.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
