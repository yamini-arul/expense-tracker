const form = document.getElementById("transactionForm");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function saveData(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function updateUI(){

    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            ${transaction.description}
            - ₹${transaction.amount}
            (${transaction.type})

            <button class="delete-btn"
            onclick="deleteTransaction(${index})">
            X
            </button>
        `;

        transactionList.appendChild(li);

        if(transaction.type==="income"){
            totalIncome += transaction.amount;
        }else{
            totalExpense += transaction.amount;
        }
    });

    income.textContent = `₹${totalIncome}`;
    expense.textContent = `₹${totalExpense}`;
    balance.textContent =
    `₹${totalIncome-totalExpense}`;
}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const transaction = {
        description: description.value,
        amount: Number(amount.value),
        type: type.value
    };

    transactions.push(transaction);

    saveData();
    updateUI();

    form.reset();
});

function deleteTransaction(index){

    transactions.splice(index,1);

    saveData();
    updateUI();
}

updateUI();