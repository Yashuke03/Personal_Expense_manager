import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import SummaryCards, { money } from "../components/SummaryCards";
import BudgetCard from "../components/BudgetCard";
export default function Dashboard() {
  const { user } = useAuth(),
    [transactions, setTransactions] = useState([]),
    [budget, setBudget] = useState(null),
    [error, setError] = useState("");
  const load = async () => {
    try {
      const [t, b] = await Promise.all([
        api.get("/transactions"),
        api.get("/budget"),
      ]);
      setTransactions(t.data);
      setBudget(b.data);
    } catch (e) {
      setError("Could not load your financial data.");
    }
  };
  useEffect(() => {
    load();
  }, []);
  const spent = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, t) => a + t.amount, 0);
  const save = async (amount) => {
    try {
      setBudget((await api.put("/budget", { amount })).data);
    } catch (e) {
      setError(e.response?.data?.message || "Could not save budget.");
    }
  };
  return (
    <main className="container page-shell">
      <p className="eyebrow mb-1">YOUR FINANCIAL SUMMARY</p>
      <h1 className="mb-4">Welcome, {user?.name?.split(" ")[0]}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <SummaryCards transactions={transactions} />
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card content-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Recent Transactions</h4>
                <Link
                  to="/transactions"
                  className="btn btn-sm btn-outline-dark"
                >
                  View all transactions
                </Link>
              </div>
              {transactions.slice(0, 5).map((t) => (
                <div className="transaction-row" key={t._id}>
                  <div>
                    <b>{t.title}</b>
                    <small>
                      {t.category} ·{" "}
                      {new Date(t.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </small>
                  </div>
                  <strong
                    className={
                      t.type === "Income" ? "text-success" : "text-danger"
                    }
                  >
                    {t.type === "Income" ? "+" : "-"}
                    {money(t.amount)}
                  </strong>
                </div>
              ))}
              {!transactions.length && (
                <p className="text-muted mb-0">
                  No transactions yet.{" "}
                  <Link to="/transactions">Add your first one.</Link>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <BudgetCard budget={budget} spent={spent} onSave={save} />
        </div>
      </div>
    </main>
  );
}
