import { useState, useMemo } from "react";
import { Trash2, Plus, Inbox } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore, getFilteredTransactions } from "@/store/useStore";
import Filters from "@/components/Filters";
import AddTransactionDialog from "@/components/AddTransactionDialog";

const TransactionList = () => {
  const transactions = useStore((s) => s.transactions);
  const searchQuery = useStore((s) => s.searchQuery);
  const filterType = useStore((s) => s.filterType);
  const sortField = useStore((s) => s.sortField);
  const sortOrder = useStore((s) => s.sortOrder);
  const role = useStore((s) => s.role);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTransactions = useMemo(
    () => getFilteredTransactions(transactions, searchQuery, filterType, sortField, sortOrder),
    [transactions, searchQuery, filterType, sortField, sortOrder]
  );

  const isAdmin = role === "admin";

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-2xl">Transactions</CardTitle>
          <p className="text-sm text-slate-500">Manage entries based on your assigned role.</p>
        </div>
        {isAdmin && (
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <Filters />

        {filteredTransactions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500 shadow-sm">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Inbox className="h-6 w-6" />
            </div>
            <p className="text-xl font-semibold text-slate-900">No transactions found</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Try adjusting search filters or add a new transaction if you are an admin.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  {isAdmin && <TableHead className="w-20" />}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((t) => (
                  <TableRow key={t.id} className="transition-colors duration-200 hover:bg-slate-50">
                    <TableCell className="whitespace-nowrap text-slate-700">
                      {new Date(t.date).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-slate-900">{t.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={t.type === "income" ? "default" : "destructive"}
                        className={t.type === "income" ? "bg-[rgb(156,196,184)] text-slate-900" : "bg-[rgb(253,187,116)] text-slate-900"}
                      >
                        {t.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">
                      {t.type === "income" ? "+" : "-"}$
                      {t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <Button
                          variant="ghost" size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-destructive"
                          onClick={() => deleteTransaction(t.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </Card>
  );
};

export default TransactionList;
