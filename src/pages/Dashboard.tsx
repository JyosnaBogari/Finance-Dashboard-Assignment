import DashboardCards from "@/components/DashboardCards";
import Charts from "@/components/Charts";
import TransactionList from "@/components/TransactionList";
import RoleToggle from "@/components/RoleToggle";
import Insights from "@/components/Insights";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-card/95 shadow-sm backdrop-blur-sm">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Personal Finance</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Finance Dashboard
            </h1>
          </div>
          <RoleToggle />
        </div>
      </header>

      <main className="container mx-auto animate-fade-in px-4 py-8 space-y-6">
        <DashboardCards />
        <Charts />
        <Insights />
        <TransactionList />
      </main>
    </div>
  );
};

export default Dashboard;
