import { money } from "./SummaryCards";
export default function TransactionList({ transactions, edit, remove }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map((t) => (
              <tr key={t._id}>
                <td className="fw-semibold">{t.title}</td>
                <td>{t.category}</td>
                <td>
                  <span
                    className={`badge ${t.type === "Income" ? "text-bg-success" : "text-bg-danger"}`}
                  >
                    {t.type}
                  </span>
                </td>
                <td
                  className={
                    t.type === "Income" ? "text-success" : "text-danger"
                  }
                >
                  {t.type === "Income" ? "+" : "-"}
                  {money(t.amount)}
                </td>
                <td>
                  {new Date(t.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-dark me-2"
                    onClick={() => edit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => remove(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
