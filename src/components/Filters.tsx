import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

const Filters = () => {
  const searchQuery = useStore((s) => s.searchQuery);
  const filterType = useStore((s) => s.filterType);
  const sortField = useStore((s) => s.sortField);
  const sortOrder = useStore((s) => s.sortOrder);
  const setSearchQuery = useStore((s) => s.setSearchQuery);
  const setFilterType = useStore((s) => s.setFilterType);
  const setSortField = useStore((s) => s.setSortField);
  const setSortOrder = useStore((s) => s.setSortOrder);

  const toggleSort = (field: "date" | "amount") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filterButtons = [
    { label: "All", value: "all" as const },
    { label: "Income", value: "income" as const },
    { label: "Expense", value: "expense" as const },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex gap-1">
        {filterButtons.map((btn) => (
          <Button
            key={btn.value}
            variant={filterType === btn.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType(btn.value)}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-1 ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSort("date")}
          className="text-xs"
        >
          Date <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSort("amount")}
          className="text-xs"
        >
          Amount <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default Filters;
