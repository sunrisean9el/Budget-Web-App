const balanceInfo = document.querySelector("#balance-info");

const incomeName = document.querySelector("#income-name");
const incomeAmount = document.querySelector("#income-amount");
const incomeBtn = document.querySelector("#income-btn");
const incomesList = document.querySelector("#incomes-list");
const incomesSum = document.querySelector("#incomes-sum");

const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");
const expenseBtn = document.querySelector("#expense-btn");
const expensesList = document.querySelector("#expenses-list");
const expensesSum = document.querySelector("#expenses-sum");

let list = [];
let balance = 0;
let totalIncomes = 0;
let totalExpenses = 0;

// Create a button to save changes in income or expense

const addSaveBtn = () => {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Zapisz";
  saveBtn.classList = "save-btn";
  return saveBtn;
};

// Create edit button

const addEditBtn = () => {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edytuj";
  editBtn.classList = "edit-btn";
  return editBtn;
};

// Create delete button

const addDeleteBtn = () => {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Usuń";
  deleteBtn.classList = "delete-btn";
  return deleteBtn;
};

// Function to update balance info

const updateBalance = () => {
  balance = totalIncomes - totalExpenses;
  if (balance > 0) {
    return (balanceInfo.textContent = `Możesz jeszcze wydać ${balance} złotych`);
  } else if (balance < 0) {
    return (balanceInfo.textContent = `Bilans jest ujemny. Jesteś na minusie ${balance} złotych`);
  } else {
    return (balanceInfo.textContent = `Bilans wynosi zero`);
  }
};

// Incomes

incomeBtn.addEventListener(
  "click",
  (addIncome = () => {
    event.preventDefault();
    let i = 0;
    if (incomeName.value && incomeAmount.value) {
      const newItem = document.createElement("li");
      if (list.length != 0) {
        i = list[list.length - 1].id + 1;
      }

      newItem.id = i;
      newItem.textContent = `${incomeName.value}: ${incomeAmount.value} zł`;
      newItem.classList = "new-item";
      incomesList.appendChild(newItem);
      const btnDiv = document.createElement("div");
      newItem.appendChild(btnDiv);
      const editBtn = addEditBtn();
      btnDiv.appendChild(editBtn);
      const deleteBtn = addDeleteBtn();
      btnDiv.appendChild(deleteBtn);

      let income = {
        id: i,
        name: incomeName.value,
        value: incomeAmount.value,
      };

      totalIncomes += incomeAmount.valueAsNumber;

      editBtn.addEventListener("click", (event) => {
        const target = event.target;
        const btnDiv = target.parentNode;
        const li = btnDiv.parentNode;
        let itemToEdit = list.findIndex((object) => object.id == li.id);
        incomeName.value = list[itemToEdit].name;
        incomeAmount.value = list[itemToEdit].value;
        totalIncomes -= list[itemToEdit].value;
        list.splice(itemToEdit, 1);
        li.parentElement.removeChild(li);
        const saveBtn = addSaveBtn();
        incomeBtn.replaceWith(saveBtn);
        incomesSum.textContent = `${totalIncomes}`;

        saveBtn.addEventListener("click", () => {
          addIncome();
          saveBtn.replaceWith(incomeBtn);
        });
      });

      deleteBtn.addEventListener("click", (event) => {
        const target = event.target;
        const btnDiv = target.parentNode;
        const li = btnDiv.parentNode;
        let itemToDelete = list.findIndex((object) => object.id == li.id);
        totalIncomes -= list[itemToDelete].value;
        list.splice(itemToDelete, 1);
        li.parentElement.removeChild(li);
        updateBalance();
        incomesSum.textContent = `${totalIncomes}`;
      });

      list.push(income);
      incomeName.value = "";
      incomeAmount.value = "";
      incomesSum.textContent = `${totalIncomes}`;
    }
    updateBalance();
  })
);

// Expenses

expenseBtn.addEventListener(
  "click",
  (addExpense = () => {
    event.preventDefault();
    let i = 0;
    if (expenseName.value && expenseAmount.value) {
      const newItem = document.createElement("li");
      if (list.length != 0) {
        i = list[list.length - 1].id + 1;
      }

      newItem.id = i;
      newItem.textContent = `${expenseName.value}: ${expenseAmount.value} zł`;
      newItem.classList = "new-item";
      expensesList.appendChild(newItem);
      const btnDiv = document.createElement("div");
      newItem.appendChild(btnDiv);
      const editBtn = addEditBtn();
      btnDiv.appendChild(editBtn);
      const deleteBtn = addDeleteBtn();
      btnDiv.appendChild(deleteBtn);

      let expense = {
        id: i,
        name: expenseName.value,
        value: expenseAmount.value,
      };

      totalExpenses += expenseAmount.valueAsNumber;

      editBtn.addEventListener("click", (event) => {
        const target = event.target;
        const btnDiv = target.parentNode;
        const li = btnDiv.parentNode;
        let itemToEdit = list.findIndex((object) => object.id == li.id);
        expenseName.value = list[itemToEdit].name;
        expenseAmount.value = list[itemToEdit].value;
        totalExpenses -= list[itemToEdit].value;
        list.splice(itemToEdit, 1);
        li.parentElement.removeChild(li);
        const saveBtn = addSaveBtn();
        expenseBtn.replaceWith(saveBtn);
        expensesSum.textContent = `${totalExpenses}`;

        saveBtn.addEventListener("click", () => {
          addExpense();
          saveBtn.replaceWith(expenseBtn);
        });
      });

      deleteBtn.addEventListener("click", (event) => {
        const target = event.target;
        const btnDiv = target.parentNode;
        const li = btnDiv.parentNode;
        let itemToDelete = list.findIndex((object) => object.id == li.id);
        totalExpenses -= list[itemToDelete].value;
        list.splice(itemToDelete, 1);
        li.parentElement.removeChild(li);
        updateBalance();
        expensesSum.textContent = `${totalExpenses}`;
      });

      list.push(expense);
      expenseName.value = "";
      expenseAmount.value = "";
      expensesSum.textContent = `${totalExpenses}`;
    }
    updateBalance();
  })
);
