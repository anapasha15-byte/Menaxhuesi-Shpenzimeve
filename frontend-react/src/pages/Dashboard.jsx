import { useEffect, useState } from "react";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions"
      );

      const data = await response.json();

      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div style={{ padding: "20px" }}>
      <h1>💰 Menaxhuesi i Shpenzimeve</h1>

      <h2>Bilanci: {balance} €</h2>

      <p>📈 Të ardhura: {income} €</p>

      <p>📉 Shpenzime: {expense} €</p>

      <hr />

      <h3>📋 Lista e Transaksioneve</h3>

      {transactions.map((t) => (
        <div
          key={t._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <strong>{t.title}</strong>

          <br />

          {t.amount} €

          <br />

          {t.type}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;