import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container py-5">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7">
              <p className="eyebrow">PERSONAL FINANCE, SIMPLIFIED</p>
              <h1>Know where your money goes.</h1>
              <p className="lead text-secondary">
                Money Manager gives you a simple, clear view of your income,
                expenses, and monthly budget.
              </p>
              <div className="d-flex gap-2">
                <Link className="btn btn-dark btn-lg" to="/register">
                  Get started
                </Link>
                <Link className="btn btn-outline-dark btn-lg" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-5">
        <div className="text-center mb-4">
          <p className="eyebrow">BUILT FOR CLARITY</p>
          <h2>Everything you need, nothing you don't.</h2>
        </div>
        <div className="row g-4">
          <Feature
            title="Track transactions"
            text="Record every income and expense in a few simple fields."
          />
          <Feature
            title="Stay on budget"
            text="Set one monthly budget and see your remaining amount at a glance."
          />
          <Feature
            title="Understand your money"
            text="See balances and recent activity without complicated reports."
          />
        </div>
      </section>
      <footer className="border-top py-4 text-center text-muted small">
        © {new Date().getFullYear()} Money Manager. Take control of your
        finances.
      </footer>
    </>
  );
}
function Feature({ title, text }) {
  return (
    <div className="col-md-4">
      <div className="feature-card">
        <h5>{title}</h5>
        <p className="mb-0 text-muted">{text}</p>
      </div>
    </div>
  );
}
