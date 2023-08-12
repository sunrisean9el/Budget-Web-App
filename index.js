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

const listOfIncomes = [];
const listOfExpenses = [];
let balance = 0;
let totalIncomes = 0;
let totalExpenses = 0;

// Create a button to save changes in income or expense

const addSaveBtn = () => {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Zapisz";
  saveBtn.classList = "save-btn";
  saveBtn.hidden = true;
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

const addIncome = () => {
  let i = 0;
  if (incomeName.value && incomeAmount.value > 0) {
    const newItem = document.createElement("li");
    if (listOfIncomes.length != 0) {
      i = listOfIncomes[listOfIncomes.length - 1].id + 1;
    }

    newItem.id = i;
    newItem.classList = "new-item";
    incomesList.appendChild(newItem);

    const spanElemName = document.createElement("span");
    spanElemName.classList = "income-name";
    newItem.appendChild(spanElemName);
    const spanElemValue = document.createElement("span");
    spanElemValue.classList = "income-value";
    newItem.appendChild(spanElemValue);

    spanElemName.textContent = `${incomeName.value}`;
    spanElemValue.textContent = `${incomeAmount.value}`;

    const btnDiv = document.createElement("div");
    btnDiv.classList = "btn-div";
    newItem.appendChild(btnDiv);
    const editBtn = addEditBtn();
    btnDiv.appendChild(editBtn);
    const saveBtn = addSaveBtn();
    btnDiv.appendChild(saveBtn);
    const deleteBtn = addDeleteBtn();
    btnDiv.appendChild(deleteBtn);

    const income = {
      id: i,
      name: incomeName.value,
      value: incomeAmount.value,
    };

    totalIncomes += incomeAmount.valueAsNumber;

    editBtn.addEventListener("click", (event) => {
      const button = event.target;
      const li = button.parentNode.parentNode;

      const spanElemName = li.children[0];
      const editNameInput = document.createElement("input");
      editNameInput.value = spanElemName.textContent;
      editNameInput.classList = "edit-input";

      li.insertBefore(editNameInput, spanElemName);
      spanElemName.remove();

      const spanElemValue = li.children[1];
      const editValueInput = document.createElement("input");
      editValueInput.type = "number";
      editValueInput.value = spanElemValue.textContent;
      editValueInput.classList = "edit-input";

      li.insertBefore(editValueInput, spanElemValue);
      spanElemValue.remove();

      saveBtn.hidden = false;
      editBtn.hidden = true;
    });

    saveBtn.addEventListener("click", (event) => {
      const button = event.target;
      const li = button.parentNode.parentNode;

      const editNameInput = li.children[0];

      const editValueInput = li.children[1];
      const editValue = Number(editValueInput.value);

      if (editNameInput.value && editValue && editValue > 0) {
        const spanElemName = document.createElement("span");
        spanElemName.classList = "income-name";
        spanElemName.textContent = editNameInput.value;
        li.insertBefore(spanElemName, editNameInput);
        editNameInput.remove();

        const spanElemValue = document.createElement("span");
        spanElemValue.classList = "income-value";
        spanElemValue.textContent = editValueInput.value;
        li.insertBefore(spanElemValue, editValueInput);
        editValueInput.remove();

        totalIncomes -= Number(income.value);
        totalIncomes += editValueInput.valueAsNumber;

        updateBalance();
        incomesSum.textContent = `${totalIncomes}`;

        income.name = spanElemName.textContent;
        income.value = spanElemValue.textContent;

        saveBtn.hidden = true;
        editBtn.hidden = false;
      } else {
        alert("Wprowadź poprawne dane");
      }
    });

    deleteBtn.addEventListener("click", (event) => {
      const target = event.target;
      const btnDiv = target.parentNode;
      const li = btnDiv.parentNode;
      const itemToDelete = listOfIncomes.findIndex(
        (object) => object.id == li.id
      );
      totalIncomes -= listOfIncomes[itemToDelete].value;
      listOfIncomes.splice(itemToDelete, 1);
      li.remove();
      updateBalance();
      incomesSum.textContent = `${totalIncomes}`;
    });

    listOfIncomes.push(income);
    incomeName.value = "";
    incomeAmount.value = "";
    incomesSum.textContent = `${totalIncomes}`;
  }

  event.preventDefault();
  updateBalance();
};

incomeBtn.addEventListener("click", addIncome);

// Expenses

const addExpense = () => {
  let i = 0;
  if (expenseName.value && expenseAmount.value > 0) {
    const newItem = document.createElement("li");
    if (listOfExpenses.length != 0) {
      i = listOfExpenses[listOfExpenses.length - 1].id + 1;
    }

    newItem.id = i;
    newItem.classList = "new-item";
    expensesList.appendChild(newItem);

    const spanElemName = document.createElement("span");
    spanElemName.classList = "li-name";
    newItem.appendChild(spanElemName);
    const spanElemValue = document.createElement("span");
    spanElemValue.classList = "li-value";
    newItem.appendChild(spanElemValue);

    spanElemName.textContent = `${expenseName.value}`;
    spanElemValue.textContent = `${expenseAmount.value}`;

    const btnDiv = document.createElement("div");
    btnDiv.classList = "btn-div";
    newItem.appendChild(btnDiv);
    const editBtn = addEditBtn();
    btnDiv.appendChild(editBtn);
    const saveBtn = addSaveBtn();
    btnDiv.appendChild(saveBtn);
    const deleteBtn = addDeleteBtn();
    btnDiv.appendChild(deleteBtn);

    const expense = {
      id: i,
      name: expenseName.value,
      value: expenseAmount.value,
    };

    totalExpenses += expenseAmount.valueAsNumber;

    editBtn.addEventListener("click", (event) => {
      const button = event.target;
      const li = button.parentNode.parentNode;

      const spanElemName = li.children[0];
      const editNameInput = document.createElement("input");
      editNameInput.value = spanElemName.textContent;
      editNameInput.classList = "edit-input";

      li.insertBefore(editNameInput, spanElemName);
      spanElemName.remove();

      const spanElemValue = li.children[1];
      const editValueInput = document.createElement("input");
      editValueInput.type = "number";
      editValueInput.value = spanElemValue.textContent;
      editValueInput.classList = "edit-input";

      li.insertBefore(editValueInput, spanElemValue);
      spanElemValue.remove();

      saveBtn.hidden = false;
      editBtn.hidden = true;
    });

    saveBtn.addEventListener("click", (event) => {
      const button = event.target;
      const li = button.parentNode.parentNode;

      const editNameInput = li.children[0];

      const editValueInput = li.children[1];
      const editValue = Number(editValueInput.value);

      if (editNameInput.value && editValue && editValue > 0) {
        const spanElemName = document.createElement("span");
        spanElemName.classList = "li-name";
        spanElemName.textContent = editNameInput.value;
        li.insertBefore(spanElemName, editNameInput);
        editNameInput.remove();

        const spanElemValue = document.createElement("span");
        spanElemValue.classList = "li-value";
        spanElemValue.textContent = editValueInput.value;
        li.insertBefore(spanElemValue, editValueInput);
        editValueInput.remove();

        totalExpenses -= Number(expense.value);
        totalExpenses += editValueInput.valueAsNumber;

        updateBalance();
        expensesSum.textContent = `${totalExpenses}`;

        expense.name = spanElemName.textContent;
        expense.value = spanElemValue.textContent;

        saveBtn.hidden = true;
        editBtn.hidden = false;
      } else {
        alert("Wprowadź poprawne dane");
      }
    });

    deleteBtn.addEventListener("click", (event) => {
      const target = event.target;
      const btnDiv = target.parentNode;
      const li = btnDiv.parentNode;
      const itemToDelete = listOfExpenses.findIndex(
        (object) => object.id == li.id
      );
      totalExpenses -= listOfExpenses[itemToDelete].value;
      listOfExpenses.splice(itemToDelete, 1);
      li.parentElement.removeChild(li);
      updateBalance();
      expensesSum.textContent = `${totalExpenses}`;
    });

    listOfExpenses.push(expense);
    expenseName.value = "";
    expenseAmount.value = "";
    expensesSum.textContent = `${totalExpenses}`;
  }

  event.preventDefault();
  updateBalance();
};

expenseBtn.addEventListener("click", addExpense);
