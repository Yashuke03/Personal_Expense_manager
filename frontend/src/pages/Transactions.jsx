import { useEffect, useState } from "react";
import api from "../services/api";
import TransactionForm, { categories } from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [items, setItems] = useState([]),
    [edit, setEdit] = useState(null),
    [show, setShow] = useState(false),
    [error, setError] = useState(""),
    [filters, setFilters] = useState({
      search: "",
      type: "All",
      category: "All",
    });
  const load = async () => {
    try {
      setItems((await api.get("/transactions")).data);
    } catch {
      setError("Could not load transactions.");
    }
  };
  useEffect(() => {
    load();
  }, []);
  const save = async (form) => {
    try {
      if (edit) await api.put(`/transactions/${edit._id}`, form);
      else await api.post("/transactions", form);
      setShow(false);
      setEdit(null);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not save transaction.");
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      load();
    } catch {
      setError("Could not delete transaction.");
    }
  };
  const filtered = items.filter(
    (t) =>
      t.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.type === "All" || t.type === filters.type) &&
      (filters.category === "All" || t.category === filters.category),
  );
  return (
    <main className="container page-shell">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="eyebrow mb-1">MONEY ACTIVITY</p>
          <h1 className="mb-0">Transactions</h1>
        </div>
        <button
          className="btn btn-dark"
          onClick={() => {
            setEdit(null);
            setShow(true);
          }}
        >
          Add Transaction
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {show && (
        <div className="card content-card mb-4">
          <div className="card-body">
            <h4>{edit ? "Edit" : "Add"} Transaction</h4>
            <TransactionForm
              initial={edit}
              onSubmit={save}
              onCancel={() => {
                setShow(false);
                setEdit(null);
              }}
            />
          </div>
        </div>
      )}
      <div className="card content-card">
        <div className="card-body border-bottom">
          <div className="row g-2">
            <div className="col-md-5">
              <input
                className="form-control"
                placeholder="Search by title"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
            <div className="col-md">
              <select
                className="form-select"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option>All</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
            <div className="col-md">
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option>All</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <TransactionList
          transactions={filtered}
          edit={(t) => {
            setEdit(t);
            setShow(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          remove={remove}
        />
      </div>
    </main>
  );
}
