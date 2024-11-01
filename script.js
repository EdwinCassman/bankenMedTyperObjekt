var main = document.getElementById("main");
var userNameInput = document.getElementById("userName");
var passwordInput = document.getElementById("password");
var loginForm = document.getElementById('loginForm');
var createAccount = document.getElementById("createAccount");
var originalContent = main.innerHTML;
var isLoggedIn = "isLoggedIn";
if (localStorage.getItem(isLoggedIn) === "yes") {
    showMainApp();
}
if (loginForm) {
    loginForm.addEventListener('submit', logIn);
}
if (createAccount) {
    createAccount.addEventListener("click", createNewAccount);
}
function logIn(e) {
    e.preventDefault();
    if (userNameInput.value && passwordInput.value) {
        if (userNameInput.value === localStorage.getItem(userNameInput.value) && passwordInput.value === localStorage.getItem(passwordInput.value)) {
            console.log("INLOGGAD");
            localStorage.setItem(isLoggedIn, "yes");
            showMainApp();
        }
        else if (userNameInput.value !== localStorage.getItem("userName") || passwordInput.value !== localStorage.getItem("userPassword")) {
            alert("fel lösen eller anamn");
        }
    }
    else if (!userNameInput.value || !passwordInput.value) {
        alert("Ange både lösen och användar namn");
    }
    userNameInput.value = "";
    passwordInput.value = "";
}
function createNewAccount() {
    console.log("skapa nytt konto");
    var main = document.getElementById("main");
    main.innerHTML = "";
    var containerDiv = document.createElement("div");
    var form = document.createElement("form");
    form.onsubmit = function (event) {
        event.preventDefault();
        saveNewAccount(event);
    };
    var userNameLabel = document.createElement("label");
    userNameLabel.setAttribute("for", "createUserName");
    userNameLabel.textContent = "Användarnamn";
    var userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("name", "userName");
    userNameInput.setAttribute("id", "createUserName");
    var passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "createPassword");
    passwordLabel.textContent = "Lösenord";
    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "createPassword");
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Skapa Konto";
    form.appendChild(userNameLabel);
    form.appendChild(userNameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);
    containerDiv.appendChild(form);
    main.appendChild(containerDiv);
    var cashAmount = "1000";
    localStorage.setItem("primaryAmount", cashAmount);
}
function saveNewAccount(e) {
    e.preventDefault();
    var userNameInput = document.getElementById("createUserName");
    var passwordInput = document.getElementById("createPassword");
    if (userNameInput.value && passwordInput.value) {
        localStorage.setItem(userNameInput.value, userNameInput.value);
        localStorage.setItem(passwordInput.value, passwordInput.value);
        console.log("new acc saved");
    }
    else if (!userNameInput.value || !passwordInput.value) {
        alert("ange både lösen och användarnamn");
    }
    userNameInput.value = "";
    passwordInput.value = "";
    main.innerHTML = originalContent;
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
function makeDeposit() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    var goBackBtn = document.createElement("button");
    goBackBtn.classList.add("go-back-btn");
    goBackBtn.textContent = "Tillbaka till meny";
    goBackBtn.onclick = function () {
        showMainApp();
    };
    var containerDiv = document.createElement("div");
    var depositInput = document.createElement("input");
    depositInput.setAttribute("type", "number");
    depositInput.setAttribute("id", "depositInput");
    var depositButton = document.createElement("button");
    depositButton.textContent = "Deposit";
    depositButton.onclick = function () {
        addDeposit();
    };
    containerDiv.appendChild(goBackBtn);
    containerDiv.appendChild(depositInput);
    containerDiv.appendChild(depositButton);
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
function makeWithdrawl() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    var containerDiv = document.createElement("div");
    var goBackBtn = document.createElement("button");
    goBackBtn.classList.add("go-back-btn");
    goBackBtn.textContent = "Tillbaka till meny";
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
    containerDiv.appendChild(goBackBtn);
    containerDiv.appendChild(withdrawInput);
    containerDiv.appendChild(withdrawButton);
    main.appendChild(containerDiv);
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
    var currentAmount = currentAmountStr ? Number(currentAmountStr) : 0; // Convert to number, default to 0 if not found
    if (amountToWithdraw > currentAmount) {
        alert("Otillräckliga medel för att ta ut detta belopp.");
        withdrawInput.value = "";
        return;
    }
    var newAmount = currentAmount - amountToWithdraw;
    localStorage.setItem("primaryAmount", newAmount.toString());
    console.log("Withdrawing: ".concat(amountToWithdraw));
    console.log("Updated primaryAmount:", localStorage.getItem("primaryAmount"));
    withdrawInput.value = "";
}
function showAmount() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    var goBackBtn = document.createElement("button");
    goBackBtn.classList.add("go-back-btn");
    goBackBtn.textContent = "Tillbaka till meny";
    goBackBtn.onclick = function () {
        showMainApp();
    };
    var containerDiv = document.createElement("div");
    var accountParagraph = document.createElement("p");
    accountParagraph.textContent = "Konto:";
    var amountParagraph = document.createElement("p");
    amountParagraph.textContent = "".concat(localStorage.getItem("primaryAmount"));
    containerDiv.appendChild(goBackBtn);
    containerDiv.appendChild(accountParagraph);
    containerDiv.appendChild(amountParagraph);
    main.appendChild(containerDiv);
    console.log("show amount");
}
function logOut() {
    console.log("UTLOGGAD");
    localStorage.setItem(isLoggedIn, "no");
    main.innerHTML = originalContent;
}
