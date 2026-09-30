import { useEffect, useState } from "react";
export const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Health",
  "Other",
];
const blank = {
  title: "",
  amount: "",
  type: "Expense",
  category: "Food",
  date: new Date().toISOString().slice(0, 10),
};
export default function TransactionForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  useEffect(
    () =>
      setForm(
        initial ? { ...initial, date: initial.date.slice(0, 10) } : blank,
      ),
    [initial],
  );
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || Number(form.amount) <= 0)
      return setError("Please enter a title and an amount greater than zero.");
    onSubmit({ ...form, amount: Number(form.amount) });
  };
  return (
    <form onSubmit={submit} className="row g-3">
      {error && (
        <div className="col-12">
          <div className="alert alert-danger py-2">{error}</div>
        </div>
      )}
      <div className="col-md-6">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Amount</label>
        <div className="input-group">
          <span className="input-group-text">₹</span>
          <input
            className="form-control"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>
      </div>
      <div className="col-md-4">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Date</label>
        <input
          className="form-control"
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>
      <div className="col-12 d-flex gap-2">
        <button className="btn btn-dark">
          {initial ? "Update" : "Add"} Transaction
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
