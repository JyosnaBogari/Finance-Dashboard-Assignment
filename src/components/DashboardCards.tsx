import { useMemo } from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStore, getBalance, getTotalIncome, getTotalExpenses } from "@/store/useStore";

const DashboardCards = () => {
  const transactions = useStore((s) => s.transactions);
  const income = useMemo(() => getTotalIncome(transactions), [transactions]);
  const expenses = useMemo(() => getTotalExpenses(transactions), [transactions]);
  const balance = useMemo(() => getBalance(transactions), [transactions]);

  const cards = [
    {
      title: "Total Balance",
      value: balance,
      icon: Wallet,
      badge: "Balance",
      className: "bg-white text-slate-900",
    },
    {
      title: "Total Income",
      value: income,
      icon: TrendingUp,
      badge: "Income",
      className: "bg-[rgb(156,196,184)] text-slate-950",
    },
    {
      title: "Total Expenses",
      value: expenses,
      icon: TrendingDown,
      badge: "Expenses",
      className: "bg-[rgb(253,187,116)] text-slate-950",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.title}
          className={`${card.className} border border-slate-200 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
        >
          <CardContent className="flex items-center justify-between gap-4 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{card.badge}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{card.title}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight">
                ${card.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 shadow-sm">
              <card.icon className="h-9 w-9" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
