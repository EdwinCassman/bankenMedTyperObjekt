var userName = "test";
var userPassword = "test";
var main = document.getElementById('main');
var originalContent = main.innerHTML;
var loginForm = document.getElementById('loginForm');
var userNameInput = document.getElementById("userName");
var userPasswordInput = document.getElementById("password");
var cashAmount = "1000";
if (loginForm) {
    loginForm.addEventListener('submit', logIn);
}
function logIn(e) {
    e.preventDefault();
    if (userNameInput.value === userName && userPasswordInput.value === userPassword) {
        showMainApp();
    }
    else {
        alert("Fel lösenord eller användarnamn");
    }
}
function showMainApp() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    var bankSection = document.createElement("div");
    bankSection.classList.add("bank-section");
    var viewBalanceDiv = document.createElement("div");
    viewBalanceDiv.classList.add("bank-task");
    viewBalanceDiv.onclick = function () {
        showAmount();
    };
    var viewBalanceHeading = document.createElement("h3");
    viewBalanceHeading.textContent = "Se saldo";
    viewBalanceDiv.appendChild(viewBalanceHeading);
    var depositDiv = document.createElement("div");
    depositDiv.classList.add("bank-task");
    depositDiv.onclick = function () {
        makeDeposit();
    };
    var depositHeading = document.createElement("h3");
    depositHeading.textContent = "Sätt in pengar";
    depositDiv.appendChild(depositHeading);
    var withdrawDiv = document.createElement("div");
    withdrawDiv.classList.add("bank-task");
    withdrawDiv.onclick = function () {
        makeWithdrawl();
    };
    var withdrawHeading = document.createElement("h3");
    withdrawHeading.textContent = "Ta ut pengar";
    withdrawDiv.appendChild(withdrawHeading);
    var exitDiv = document.createElement("div");
    exitDiv.classList.add("bank-task");
    exitDiv.onclick = function () {
        logOut();
    };
    var exitHeading = document.createElement("h3");
    exitHeading.textContent = "Avsluta";
    exitDiv.appendChild(exitHeading);
    bankSection.appendChild(viewBalanceDiv);
    bankSection.appendChild(depositDiv);
    bankSection.appendChild(withdrawDiv);
    bankSection.appendChild(exitDiv);
    main.appendChild(bankSection);
}
function showAmount() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    var goBackBtn = document.createElement("button");
    goBackBtn.classList.add("go-back-btn");
    goBackBtn.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i> Tillbaka till meny";
    goBackBtn.onclick = function () {
        showMainApp();
    };
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("container-div");
    var accountParagraph = document.createElement("p");
    accountParagraph.textContent = "Konto:";
    var amountParagraph = document.createElement("p");
    var primAmount = localStorage.getItem("primaryAmount");
    var formattedAmount = primAmount
        ? "".concat(new Intl.NumberFormat('sv-SE').format(Number(primAmount)), " kr")
        : "0 kr";
    amountParagraph.textContent = formattedAmount;
    containerDiv.appendChild(goBackBtn);
    containerDiv.appendChild(accountParagraph);
    containerDiv.appendChild(amountParagraph);
    main.appendChild(containerDiv);
    console.log("show amount");
}
function makeDeposit() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    var goBackBtn = document.createElement("button");
    goBackBtn.classList.add("go-back-btn");
    goBackBtn.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i> Tillbaka till meny";
    goBackBtn.onclick = function () {
        showMainApp();
    };
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("container-div");
    var depositInput = document.createElement("input");
    depositInput.setAttribute("type", "number");
    depositInput.setAttribute("id", "depositInput");
    var depositButton = document.createElement("button");
    depositButton.textContent = "Sätt in";
    depositButton.onclick = function () {
        addDeposit();
    };
    depositInput.classList.add("container-input");
    depositButton.classList.add("container-btn");
    containerDiv.appendChild(goBackBtn);
    containerDiv.appendChild(depositInput);
    containerDiv.appendChild(depositButton);
    main.appendChild(containerDiv);
}
function makeWithdrawl() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("container-div");
    var goBackBtn = document.createElement("button");
    goBackBtn.classList.add("go-back-btn");
    goBackBtn.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i> Tillbaka till meny";
    goBackBtn.onclick = function () {
        showMainApp();
    };
    var withdrawInput = document.createElement("input");
    withdrawInput.setAttribute("type", "number");
    withdrawInput.setAttribute("id", "withdrawlInput");
    var withdrawButton = document.createElement("button");
    withdrawButton.textContent = "Withdrawl";
    withdrawButton.onclick = function () {
        addWithdrawl();
    };
    withdrawInput.classList.add("container-input");
    withdrawButton.classList.add("container-btn");
    containerDiv.appendChild(goBackBtn);
    containerDiv.appendChild(withdrawInput);
    containerDiv.appendChild(withdrawButton);
    main.appendChild(containerDiv);
}
function addDeposit() {
    var depositInput = document.getElementById("depositInput");
    var amountToDeposit = Number(depositInput.value);
    if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
        alert("Ange korrekt belopp att sätta in");
        return;
    }
    var currentAmount = localStorage.getItem("primaryAmount");
    var newAmount;
    if (currentAmount) {
        newAmount = Number(currentAmount) + amountToDeposit;
    }
    else {
        newAmount = amountToDeposit;
    }
    localStorage.setItem("primaryAmount", newAmount.toString());
    console.log("Updated primaryAmount:", localStorage.getItem("primaryAmount"));
    depositInput.value = "";
}
function addWithdrawl() {
    var withdrawInput = document.getElementById("withdrawlInput");
    var amountToWithdraw = Number(withdrawInput.value);
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
        alert("Ange korrekt belopp att ta ut");
        withdrawInput.value = "";
        return;
    }
    var currentAmountStr = localStorage.getItem("primaryAmount");
    var currentAmount = currentAmountStr ? Number(currentAmountStr) : 0;
    if (amountToWithdraw > currentAmount) {
        alert("Otillräckligt med pengar för att ta ut detta belopp.");
        withdrawInput.value = "";
        return;
    }
    var newAmount = currentAmount - amountToWithdraw;
    localStorage.setItem("primaryAmount", newAmount.toString());
    console.log("Withdrawing: ".concat(amountToWithdraw));
    console.log("Updated primaryAmount:", localStorage.getItem("primaryAmount"));
    withdrawInput.value = "";
}
function logOut() {
    location.reload();
}
