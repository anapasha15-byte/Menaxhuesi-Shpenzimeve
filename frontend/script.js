const username = localStorage.getItem("username");

const form = document.getElementById("transactionForm");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");

const transactionList =
  document.getElementById("transactionList");

const balance =
  document.getElementById("balance");

const income =
  document.getElementById("income");

const expense =
  document.getElementById("expense");

let transactions =
  JSON.parse(
    localStorage.getItem(
      `${username}_transactions`
    )
  ) || [];

// Shto transaksion
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    title: title.value,
    amount: Number(amount.value),
    type: type.value,
    category: category.value,

    date: new Date().toLocaleDateString(
      "sq-AL"
    ),
  };

  transactions.push(transaction);

  renderTransactions();

  form.reset();

  closeModal();
});

// Shfaq transaksionet
function renderTransactions() {
  transactionList.innerHTML = "";

  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((transaction) => {

    const li =
      document.createElement("li");

    if (transaction.type === "income") {
      li.classList.add("income-item");
    } else {
      li.classList.add("expense-item");
    }

    li.innerHTML = `
      <div>

        <strong>
          ${transaction.category}
        </strong>

        <br>

        ${transaction.title}

        <br>

        <small>
          📅 ${transaction.date}
        </small>

        <br>

        €${transaction.amount}

      </div>

      <div>

        <button
          onclick="editTransaction(${transaction.id})">
          ✏️
        </button>

        <button
          onclick="deleteTransaction(${transaction.id})">
          🗑️
        </button>

      </div>
    `;

    transactionList.appendChild(li);

    if (transaction.type === "income") {
      incomeTotal += transaction.amount;
    } else {
      expenseTotal += transaction.amount;
    }
  });

  income.textContent =
    incomeTotal + " €";

  expense.textContent =
    expenseTotal + " €";

  balance.textContent =
    incomeTotal - expenseTotal + " €";

  localStorage.setItem(
    `${username}_transactions`,
    JSON.stringify(transactions)
  );
}

// Fshi transaksion
function deleteTransaction(id) {

  const confirmDelete = confirm(
    "A jeni i sigurt qe deshironi ta fshini kete transaksion?"
  );

  if (!confirmDelete) {
    return;
  }

  transactions = transactions.filter(
    (transaction) =>
      transaction.id !== id
  );

  renderTransactions();
}

// Edito transaksion
function editTransaction(id) {

  const transaction =
    transactions.find(
      (t) => t.id === id
    );

  if (!transaction) {
    return;
  }

  const newTitle = prompt(
    "Ndrysho emrin:",
    transaction.title
  );

  if (!newTitle) {
    return;
  }

  const newAmount = prompt(
    "Ndrysho shumën:",
    transaction.amount
  );

  if (!newAmount) {
    return;
  }

  transaction.title = newTitle;
  transaction.amount =
    Number(newAmount);

  renderTransactions();
}

// Hap modalin
function openModal() {
  document.querySelector(".modal")
    .style.display = "block";
}

// Mbyll modalin
function closeModal() {
  document.querySelector(".modal")
    .style.display = "none";
}

// Logout
function logout() {

  localStorage.removeItem(
    "username"
  );

  window.location.href =
    "login.html";
}

// Dark Mode
function toggleDarkMode() {

  document.body.classList.toggle(
    "dark-mode"
  );

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains(
      "dark-mode"
    )
  );
}

if (
  localStorage.getItem("darkMode")
  === "true"
) {
  document.body.classList.add(
    "dark-mode"
  );
}

// Emri i përdoruesit
if (username) {

  document.getElementById(
    "welcomeUser"
  ).textContent =
    `Përshëndetje, ${username} 👋`;
}
function openSettings(){

    document.getElementById(
        "settingsModal"
    ).style.display = "flex";

    document.getElementById(
        "settingsUser"
    ).textContent =
        "👤 Përdoruesi: " + username;
}

function closeSettings(){

    document.getElementById(
        "settingsModal"
    ).style.display = "none";
}
// Ngarko transaksionet
renderTransactions();