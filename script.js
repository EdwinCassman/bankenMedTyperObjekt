var Auth = /** @class */ (function () {
    function Auth(mainElementId) {
        this.userName = "test";
        this.userPassword = "test";
        this.main = document.getElementById(mainElementId);
        this.bankApp = new BankApp(mainElementId, this);
        var loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.logIn.bind(this));
        }
    }
    Auth.prototype.logIn = function (e) {
        e.preventDefault();
        var userNameInput = document.getElementById("userName");
        var userPasswordInput = document.getElementById("password");
        if (userNameInput.value === this.userName && userPasswordInput.value === this.userPassword) {
            this.bankApp.showMainApp();
        }
        else {
            alert("Fel lösenord eller användarnamn");
        }
    };
    Auth.prototype.logOut = function () {
        location.reload();
    };
    return Auth;
}());
var BankApp = /** @class */ (function () {
    function BankApp(mainElementId, authInstance) {
        this.main = document.getElementById(mainElementId);
        this.auth = authInstance;
    }
    BankApp.prototype.showMainApp = function () {
        this.main.innerHTML = "";
        var bankSection = this.createElement("div", ["bank-section"]);
        var viewBalanceDiv = this.createTask("Se saldo", this.showAmount.bind(this));
        var depositDiv = this.createTask("Sätt in pengar", this.makeDeposit.bind(this));
        var withdrawDiv = this.createTask("Ta ut pengar", this.makeWithdrawl.bind(this));
        var exitDiv = this.createTask("Avsluta", this.auth.logOut.bind(this.auth));
        bankSection.append(viewBalanceDiv, depositDiv, withdrawDiv, exitDiv);
        this.main.appendChild(bankSection);
    };
    BankApp.prototype.showAmount = function () {
        this.main.innerHTML = "";
        var goBackBtn = this.createGoBackButton();
        var containerDiv = this.createElement("div", ["container-div"]);
        var accountParagraph = this.createElement("p", [], "Konto:");
        var amountParagraph = this.createElement("p");
        var primAmount = localStorage.getItem("primaryAmount");
        var formattedAmount = primAmount
            ? "".concat(new Intl.NumberFormat('sv-SE').format(Number(primAmount)), " kr")
            : "0 kr";
        amountParagraph.textContent = formattedAmount;
        containerDiv.append(goBackBtn, accountParagraph, amountParagraph);
        this.main.appendChild(containerDiv);
    };
    BankApp.prototype.makeDeposit = function () {
        this.main.innerHTML = "";
        var goBackBtn = this.createGoBackButton();
        var containerDiv = this.createElement("div", ["container-div"]);
        var depositInput = this.createElement("input", ["container-input"]);
        depositInput.type = "number";
        depositInput.id = "depositInput";
        var depositButton = this.createElement("button", ["container-btn"], "Sätt in");
        depositButton.onclick = this.addDeposit.bind(this);
        containerDiv.append(goBackBtn, depositInput, depositButton);
        this.main.appendChild(containerDiv);
    };
    BankApp.prototype.makeWithdrawl = function () {
        this.main.innerHTML = "";
        var goBackBtn = this.createGoBackButton();
        var containerDiv = this.createElement("div", ["container-div"]);
        var withdrawInput = this.createElement("input", ["container-input"]);
        withdrawInput.type = "number";
        withdrawInput.id = "withdrawlInput";
        var withdrawButton = this.createElement("button", ["container-btn"], "Ta ut");
        withdrawButton.onclick = this.addWithdrawl.bind(this);
        containerDiv.append(goBackBtn, withdrawInput, withdrawButton);
        this.main.appendChild(containerDiv);
    };
    BankApp.prototype.addDeposit = function () {
        var depositInput = document.getElementById("depositInput");
        var amountToDeposit = Number(depositInput.value);
        if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
            alert("Ange korrekt belopp att sätta in");
            return;
        }
        var currentAmount = localStorage.getItem("primaryAmount");
        var newAmount = currentAmount ? Number(currentAmount) + amountToDeposit : amountToDeposit;
        localStorage.setItem("primaryAmount", newAmount.toString());
        depositInput.value = "";
    };
    BankApp.prototype.addWithdrawl = function () {
        var withdrawInput = document.getElementById("withdrawlInput");
        var amountToWithdraw = Number(withdrawInput.value);
        if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
            alert("Ange korrekt belopp att ta ut");
            return;
        }
        var currentAmountStr = localStorage.getItem("primaryAmount");
        var currentAmount = currentAmountStr ? Number(currentAmountStr) : 0;
        if (amountToWithdraw > currentAmount) {
            alert("Otillräckligt med pengar för att ta ut detta belopp.");
            return;
        }
        var newAmount = currentAmount - amountToWithdraw;
        localStorage.setItem("primaryAmount", newAmount.toString());
        withdrawInput.value = "";
    };
    BankApp.prototype.createTask = function (title, onclick) {
        var taskDiv = this.createElement("div", ["bank-task"]);
        taskDiv.onclick = onclick;
        var heading = this.createElement("h3", [], title);
        taskDiv.appendChild(heading);
        return taskDiv;
    };
    BankApp.prototype.createGoBackButton = function () {
        var button = this.createElement("button", ["go-back-btn"]);
        button.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i> Tillbaka till meny";
        button.onclick = this.showMainApp.bind(this);
        return button;
    };
    BankApp.prototype.createElement = function (tag, classes, textContent) {
        var _a;
        if (classes === void 0) { classes = []; }
        var element = document.createElement(tag);
        if (classes.length)
            (_a = element.classList).add.apply(_a, classes);
        if (textContent)
            element.textContent = textContent;
        return element;
    };
    return BankApp;
}());
new Auth("main");
