const main = document.getElementById("main")!
const userNameInput = document.getElementById("userName") as HTMLInputElement
const passwordInput = document.getElementById("password") as HTMLInputElement
const loginForm = document.getElementById('loginForm');
const createAccount = document.getElementById("createAccount")
const originalContent = main.innerHTML


let isLoggedIn: string = "isLoggedIn"


if(localStorage.getItem(isLoggedIn) === "yes"){
    showMainApp()
}

if (loginForm) {
    loginForm.addEventListener('submit', logIn);
}

if(createAccount){
    createAccount.addEventListener("click", createNewAccount)
}

function logIn(e: SubmitEvent){
    e.preventDefault()
    if(userNameInput.value && passwordInput.value){

        if(userNameInput.value === localStorage.getItem(userNameInput.value) && passwordInput.value === localStorage.getItem(passwordInput.value)){
            
            console.log("INLOGGAD")
            localStorage.setItem(isLoggedIn, "yes")
            showMainApp()

        } else if(userNameInput.value !== localStorage.getItem("userName") || passwordInput.value !== localStorage.getItem("userPassword")){
            alert("fel lösen eller anamn")
        }
    } else if(!userNameInput.value || !passwordInput.value){
        alert("Ange både lösen och användar namn")
    }
    
    userNameInput.value = ""
    passwordInput.value = ""

    
}

function createNewAccount(): void {
    console.log("skapa nytt konto");

    const main = document.getElementById("main") as HTMLElement;
    main.innerHTML = "";

    const containerDiv: HTMLDivElement = document.createElement("div");

    const form: HTMLFormElement = document.createElement("form");

    form.onsubmit = function(event: SubmitEvent): void {
        event.preventDefault(); 
        saveNewAccount(event); 
    };

    const userNameLabel: HTMLLabelElement = document.createElement("label");
    userNameLabel.setAttribute("for", "createUserName");
    userNameLabel.textContent = "Användarnamn";

    const userNameInput: HTMLInputElement = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("name", "userName");
    userNameInput.setAttribute("id", "createUserName");

    const passwordLabel: HTMLLabelElement = document.createElement("label");
    passwordLabel.setAttribute("for", "createPassword");
    passwordLabel.textContent = "Lösenord";

    const passwordInput: HTMLInputElement = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "createPassword");

    const submitButton: HTMLButtonElement = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Skapa Konto";

    form.appendChild(userNameLabel);
    form.appendChild(userNameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);

    containerDiv.appendChild(form);

    main.appendChild(containerDiv);

    let cashAmount = "1000"
    localStorage.setItem("primaryAmount", cashAmount)
}



function saveNewAccount(e: SubmitEvent): void {
    e.preventDefault();

    const userNameInput = document.getElementById("createUserName") as HTMLInputElement;
    const passwordInput = document.getElementById("createPassword") as HTMLInputElement;

    if (userNameInput.value && passwordInput.value) {
        localStorage.setItem(userNameInput.value, userNameInput.value);
        localStorage.setItem(passwordInput.value, passwordInput.value);

        console.log("new acc saved");
    } else if(!userNameInput.value || !passwordInput.value){
        alert("ange både lösen och användarnamn")
    }

    userNameInput.value = ""
    passwordInput.value = ""

    main.innerHTML = originalContent
}

function showMainApp(): void {

    const main = document.getElementById("main") as HTMLElement;
    main.innerHTML = "";

    const bankSection: HTMLDivElement = document.createElement("div");
    bankSection.classList.add("bank-section");

    const viewBalanceDiv: HTMLDivElement = document.createElement("div");
    viewBalanceDiv.classList.add("bank-task");
    viewBalanceDiv.onclick = function() {
        showAmount();
    };
    const viewBalanceHeading: HTMLHeadingElement = document.createElement("h3");
    viewBalanceHeading.textContent = "Se saldo";
    viewBalanceDiv.appendChild(viewBalanceHeading);

    const depositDiv: HTMLDivElement = document.createElement("div");
    depositDiv.classList.add("bank-task");
    depositDiv.onclick = function() {
        makeDeposit();
    };
    const depositHeading: HTMLHeadingElement = document.createElement("h3");
    depositHeading.textContent = "Sätt in pengar";
    depositDiv.appendChild(depositHeading);

    const withdrawDiv: HTMLDivElement = document.createElement("div");
    withdrawDiv.classList.add("bank-task");
    withdrawDiv.onclick = function(){
        makeWithdrawl()
    }
    const withdrawHeading: HTMLHeadingElement = document.createElement("h3");
    withdrawHeading.textContent = "Ta ut pengar";
    withdrawDiv.appendChild(withdrawHeading);

    const exitDiv: HTMLDivElement = document.createElement("div");
    exitDiv.classList.add("bank-task");
    exitDiv.onclick = function(){
        logOut()
    }
    const exitHeading: HTMLHeadingElement = document.createElement("h3");
    exitHeading.textContent = "Avsluta";
    exitDiv.appendChild(exitHeading);

    bankSection.appendChild(viewBalanceDiv);
    bankSection.appendChild(depositDiv);
    bankSection.appendChild(withdrawDiv);
    bankSection.appendChild(exitDiv);

    main.appendChild(bankSection);
}




function makeDeposit(): void {
    const main = document.getElementById("main") as HTMLElement;
    
    main.innerHTML = "";

    const goBackBtn: HTMLButtonElement = document.createElement("button")
    goBackBtn.classList.add("go-back-btn")
    goBackBtn.textContent = "Tillbaka till meny";
    goBackBtn.onclick = function() {
        showMainApp()
    };
    
    const containerDiv: HTMLDivElement = document.createElement("div");
    
    const depositInput: HTMLInputElement = document.createElement("input");
    depositInput.setAttribute("type", "number");
    depositInput.setAttribute("id", "depositInput");
    
    const depositButton: HTMLButtonElement = document.createElement("button");
    depositButton.textContent = "Deposit";
    depositButton.onclick = function() {
        addDeposit();
    };
    
    containerDiv.appendChild(goBackBtn)
    containerDiv.appendChild(depositInput);
    containerDiv.appendChild(depositButton);
    
    main.appendChild(containerDiv);
}


function addDeposit(): void {
    const depositInput = document.getElementById("depositInput") as HTMLInputElement;
    
    const amountToDeposit = Number(depositInput.value);
    
    if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
        alert("Ange korrekt belopp att sätta in");
        return;
    }
    
    let currentAmount = localStorage.getItem("primaryAmount");
    let newAmount: number;
    
    if (currentAmount) {
        newAmount = Number(currentAmount) + amountToDeposit; 
    } else {
        newAmount = amountToDeposit; 
    }
    
    localStorage.setItem("primaryAmount", newAmount.toString());
    
    console.log("Updated primaryAmount:", localStorage.getItem("primaryAmount"));
    
    depositInput.value = "";
}


function makeWithdrawl(): void {
    const main = document.getElementById("main") as HTMLElement;
    
    main.innerHTML = "";
    
    const containerDiv: HTMLDivElement = document.createElement("div");

    const goBackBtn: HTMLButtonElement = document.createElement("button")
    goBackBtn.classList.add("go-back-btn")
    goBackBtn.textContent = "Tillbaka till meny";
    goBackBtn.onclick = function() {
        showMainApp()
    };
    
    const withdrawInput: HTMLInputElement = document.createElement("input");
    withdrawInput.setAttribute("type", "number");
    withdrawInput.setAttribute("id", "withdrawlInput");
    
    const withdrawButton: HTMLButtonElement = document.createElement("button");
    withdrawButton.textContent = "Withdrawl";
    withdrawButton.onclick = function() {
        addWithdrawl();
    };
    
    containerDiv.appendChild(goBackBtn)
    containerDiv.appendChild(withdrawInput);
    containerDiv.appendChild(withdrawButton);
    
    main.appendChild(containerDiv);
}

function addWithdrawl(): void {
    const withdrawInput = document.getElementById("withdrawlInput") as HTMLInputElement;

    const amountToWithdraw = Number(withdrawInput.value); 

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
        alert("Ange korrekt belopp att ta ut");
        withdrawInput.value = ""; 
        return;
    }

    const currentAmountStr = localStorage.getItem("primaryAmount");
    const currentAmount = currentAmountStr ? Number(currentAmountStr) : 0; // Convert to number, default to 0 if not found

    if (amountToWithdraw > currentAmount) {
        alert("Otillräckliga medel för att ta ut detta belopp.");
        withdrawInput.value = ""; 
        return;
    }

    const newAmount = currentAmount - amountToWithdraw;

    localStorage.setItem("primaryAmount", newAmount.toString());

    console.log(`Withdrawing: ${amountToWithdraw}`);
    console.log("Updated primaryAmount:", localStorage.getItem("primaryAmount"));

    withdrawInput.value = "";
}


function showAmount(): void {
    const main = document.getElementById("main") as HTMLElement;
    
    main.innerHTML = "";

    const goBackBtn: HTMLButtonElement = document.createElement("button")
    goBackBtn.classList.add("go-back-btn")
    goBackBtn.textContent = "Tillbaka till meny";
    goBackBtn.onclick = function() {
        showMainApp()
    };

    const containerDiv: HTMLDivElement = document.createElement("div");

    const accountParagraph: HTMLParagraphElement = document.createElement("p");
    accountParagraph.textContent = "Konto:";

    const amountParagraph: HTMLParagraphElement = document.createElement("p");
    amountParagraph.textContent = `${localStorage.getItem("primaryAmount")}`;

    containerDiv.appendChild(goBackBtn)
    containerDiv.appendChild(accountParagraph);
    containerDiv.appendChild(amountParagraph);

    main.appendChild(containerDiv);

    console.log("show amount");
}

function logOut(){
    console.log("UTLOGGAD")
    localStorage.setItem(isLoggedIn, "no")
    main.innerHTML = originalContent
    
}

