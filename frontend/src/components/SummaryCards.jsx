const money = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
export { money };
export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((a, t) => a + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, t) => a + t.amount, 0);
  return (
    <div className="row g-3 mb-4">
      <Card
        title="Total Balance"
        value={money(income - expenses)}
        kind="balance"
      />
      <Card title="Total Income" value={money(income)} kind="income" />
      <Card title="Total Expenses" value={money(expenses)} kind="expense" />
    </div>
  );
}
function Card({ title, value, kind }) {
  return (
    <div className="col-md-4">
      <div className={`card summary-card ${kind}`}>
        <div className="card-body">
          <p>{title}</p>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
}
