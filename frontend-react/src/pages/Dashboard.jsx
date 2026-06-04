import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] =
  useState("💼 Rrogë");

const [darkMode, setDarkMode] =
  useState(
    localStorage.getItem("darkMode") === "true"
  );

useEffect(() => {
  fetchTransactions();
}, []);

useEffect(() => {
  localStorage.setItem(
    "darkMode",
    darkMode
  );
}, [darkMode]);

const fetchTransactions = async () => {
  try {
    const userId =
      localStorage.getItem("userId");

    const response = await fetch(
      `http://localhost:5000/api/transactions?userId=${userId}`
    );

    const data = await response.json();

    setTransactions(data);
  } catch (error) {
    console.log(error);
  }
};
 const addTransaction = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem(
            "userId"
          ),
          title,
          amount: Number(amount),
          type,
          category,
        }),
      }
    );

    if (response.ok) {
      setTitle("");
      setAmount("");
      setType("income");
      setCategory("💼 Rrogë");

      fetchTransactions();
    }
  } catch (error) {
    console.log(error);
  }
};

 const deleteTransaction = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/transactions/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchTransactions();
    }
  } catch (error) {
    console.log(error);
  }
};

const editTransaction = async (transaction) => {
  const newTitle = prompt(
    "Ndrysho titullin:",
    transaction.title
  );

  if (!newTitle) return;

  const newAmount = prompt(
    "Ndrysho shumën:",
    transaction.amount
  );

  if (!newAmount) return;

  try {
    const response = await fetch(
      `http://localhost:5000/api/transactions/${transaction._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          amount: Number(newAmount),
        }),
      }
    );

    if (response.ok) {
      fetchTransactions();
    }
  } catch (error) {
    console.log(error);
  }
};

  const logout = () => {
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
  <div
  className={`container ${
    darkMode ? "dark-mode" : ""
  }`}
>
     <div className="profile-header">
  <div className="avatar">👤</div>

  <div className="user-info">
    <h2>
      Përshëndetje,{" "}
      {localStorage.getItem("username")}
    </h2>

    <p>Menaxho financat e tua</p>
  </div>

  <button
    className="logout-btn"
    onClick={() =>
      setDarkMode(!darkMode)
    }
  >
    {darkMode
      ? "☀️ Light"
      : "🌙 Dark"}
  </button>

  <button
    className="logout-btn"
    onClick={logout}
  >
    🚪 Logout
  </button>
</div>
      <div className="balance-card">
        <div>💳 Bilanci Aktual</div>

        <h2>{balance} €</h2>

        <p>Menaxho financat e tua personale</p>
      </div>

      <div className="summary">
        <div className="card income-card">
          <h3>📈 Të Ardhura</h3>
          <p>{income} €</p>
        </div>

        <div className="card expense-card">
          <h3>📉 Shpenzime</h3>
          <p>{expense} €</p>
        </div>
      </div>

      <div className="form-container">
        <h2>➕ Shto Transaksion</h2>

        <form onSubmit={addTransaction}>
          <input
            type="text"
            placeholder="Titulli"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Shuma"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="income">
              📈 Të Ardhura
            </option>

            <option value="expense">
              📉 Shpenzim
            </option>
          </select>
          <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
  <option value="💼 Rrogë">
    💼 Rrogë
  </option>

  <option value="🍔 Ushqim">
    🍔 Ushqim
  </option>

  <option value="🚕 Transport">
    🚕 Transport
  </option>

  <option value="🏠 Qira">
    🏠 Qira
  </option>

  <option value="🎉 Argëtim">
    🎉 Argëtim
  </option>

  <option value="💡 Fatura">
    💡 Fatura
  </option>
</select>

          <button type="submit">
            ➕ Shto Transaksion
          </button>
        </form>
      </div>

      <div className="transactions">
  <h2>📋 Lista e Transaksioneve</h2>

  <ul id="transactionList">
    {transactions.map((t) => (
      <li
        key={t._id}
        className={
          t.type === "income"
            ? "income-item"
            : "expense-item"
        }
      >
        <div>
          <strong>{t.category}</strong>

          <br />

          {t.title}

          <br />

          {t.amount} €
        </div>

        <div>
          <button
            onClick={() =>
              editTransaction(t)
            }
          >
            ✏️
          </button>

          <button
            onClick={() =>
              deleteTransaction(t._id)
            }
          >
            🗑️
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
}

export default Dashboard;

