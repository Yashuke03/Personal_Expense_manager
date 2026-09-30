import { useState } from "react";
import { money } from "./SummaryCards";

export default function BudgetCard({ budget, spent, onSave }) {
  const [value, setValue] = useState(budget?.amount || "");
  const save = (e) => {
    e.preventDefault();
    onSave(value);
  };

  const amount = budget?.amount || 0,
    remaining = Math.max(amount - spent, 0),
    percent = amount ? Math.min(100, Math.round((spent / amount) * 100)) : 0;

  return (
    <div className="card budget-card">
      <div className="card-body">
        <h5 className="mb-3">Monthly Budget</h5>
        <form className="input-group mb-4" onSubmit={save}>
          <span className="input-group-text">₹</span>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Set your monthly budget"
            required
          />
          <button className="btn btn-dark">Save</button>
        </form>
        <div className="d-flex justify-content-between small mb-2">
          <span>
            Budget: <b>{money(amount)}</b>
          </span>
          <span>
            Spent: <b>{money(spent)}</b>
          </span>
        </div>
        <div className="progress mb-2" role="progressbar">
          <div
            className="progress-bar bg-danger"
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>
        <p className="mb-0 small text-muted">
          Remaining: <b>{money(remaining)}</b>
        </p>
      </div>
    </div>
  );
}
