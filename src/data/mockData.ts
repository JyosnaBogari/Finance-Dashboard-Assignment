export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-04-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2026-04-02", description: "Grocery Store", amount: 85.50, category: "Food", type: "expense" },
  { id: "3", date: "2026-04-03", description: "Uber Ride", amount: 24.00, category: "Transport", type: "expense" },
  { id: "4", date: "2026-04-04", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "5", date: "2026-04-05", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "6", date: "2026-04-06", description: "Electric Bill", amount: 120.00, category: "Bills", type: "expense" },
  { id: "7", date: "2026-04-07", description: "New Sneakers", amount: 89.99, category: "Shopping", type: "expense" },
  { id: "8", date: "2026-04-08", description: "Pharmacy", amount: 32.50, category: "Health", type: "expense" },
  { id: "9", date: "2026-04-10", description: "Restaurant Dinner", amount: 67.00, category: "Food", type: "expense" },
  { id: "10", date: "2026-04-12", description: "Gas Station", amount: 45.00, category: "Transport", type: "expense" },
  { id: "11", date: "2026-04-14", description: "Dividend Income", amount: 340, category: "Investment", type: "income" },
  { id: "12", date: "2026-04-15", description: "Internet Bill", amount: 59.99, category: "Bills", type: "expense" },
  { id: "13", date: "2026-04-16", description: "Concert Tickets", amount: 120.00, category: "Entertainment", type: "expense" },
  { id: "14", date: "2026-04-18", description: "Lunch", amount: 18.50, category: "Food", type: "expense" },
  { id: "15", date: "2026-04-20", description: "Gym Membership", amount: 40.00, category: "Health", type: "expense" },
  // Last month data for comparison
  { id: "16", date: "2026-03-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "17", date: "2026-03-03", description: "Grocery Store", amount: 72.00, category: "Food", type: "expense" },
  { id: "18", date: "2026-03-05", description: "Bus Pass", amount: 60.00, category: "Transport", type: "expense" },
  { id: "19", date: "2026-03-08", description: "Movie Tickets", amount: 30.00, category: "Entertainment", type: "expense" },
  { id: "20", date: "2026-03-10", description: "Water Bill", amount: 35.00, category: "Bills", type: "expense" },
  { id: "21", date: "2026-03-15", description: "Freelance Gig", amount: 800, category: "Freelance", type: "income" },
  { id: "22", date: "2026-03-20", description: "New Jacket", amount: 65.00, category: "Shopping", type: "expense" },
  { id: "23", date: "2026-03-25", description: "Dentist Visit", amount: 150.00, category: "Health", type: "expense" },
];
