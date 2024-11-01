let userName: string = "test"
let userPassword: string = "test"

const main = document.getElementById('main')!
const originalContent = main.innerHTML

const loginForm = document.getElementById('loginForm')
const userNameInput = document.getElementById("userName") as HTMLInputElement
const userPasswordInput = document.getElementById("password") as HTMLInputElement


let cashAmount:string = "1000"


if (loginForm) {
    loginForm.addEventListener('submit', logIn)
}


function logIn(e: SubmitEvent){
    e.preventDefault()

    if(userNameInput.value === userName && userPasswordInput.value === userPassword){
        showMainApp()

    } else {
        alert("Fel lösenord eller användarnamn")
    }

}

function showMainApp(): void {

    const main = document.getElementById("main") as HTMLElement;
    main.innerHTML = ""

    const bankSection: HTMLDivElement = document.createElement("div")
    bankSection.classList.add("bank-section")

    const viewBalanceDiv: HTMLDivElement = document.createElement("div")
    viewBalanceDiv.classList.add("bank-task")
    viewBalanceDiv.onclick = function() {
        showAmount()
    }
    const viewBalanceHeading: HTMLHeadingElement = document.createElement("h3")
    viewBalanceHeading.textContent = "Se saldo"
    viewBalanceDiv.appendChild(viewBalanceHeading)

    const depositDiv: HTMLDivElement = document.createElement("div")
    depositDiv.classList.add("bank-task")
    depositDiv.onclick = function() {
        makeDeposit()
    }
    const depositHeading: HTMLHeadingElement = document.createElement("h3")
    depositHeading.textContent = "Sätt in pengar"
    depositDiv.appendChild(depositHeading)

    const withdrawDiv: HTMLDivElement = document.createElement("div")
    withdrawDiv.classList.add("bank-task")
    withdrawDiv.onclick = function(){
        makeWithdrawl()
    }
    const withdrawHeading: HTMLHeadingElement = document.createElement("h3")
    withdrawHeading.textContent = "Ta ut pengar"
    withdrawDiv.appendChild(withdrawHeading)

    const exitDiv: HTMLDivElement = document.createElement("div")
    exitDiv.classList.add("bank-task")
    exitDiv.onclick = function(){
        logOut()
    }
    const exitHeading: HTMLHeadingElement = document.createElement("h3")
    exitHeading.textContent = "Avsluta"
    exitDiv.appendChild(exitHeading)

    bankSection.appendChild(viewBalanceDiv)
    bankSection.appendChild(depositDiv)
    bankSection.appendChild(withdrawDiv)
    bankSection.appendChild(exitDiv)

    main.appendChild(bankSection)
}

function showAmount(): void {
    const main = document.getElementById("main") as HTMLElement
    
    main.innerHTML = ""

    const goBackBtn: HTMLButtonElement = document.createElement("button")
    goBackBtn.classList.add("go-back-btn")
    goBackBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Tillbaka till meny`
    goBackBtn.onclick = function() {
        showMainApp()
    }

    const containerDiv: HTMLDivElement = document.createElement("div")
    containerDiv.classList.add("container-div")

    const accountParagraph: HTMLParagraphElement = document.createElement("p")
    accountParagraph.textContent = "Konto:"

    const amountParagraph: HTMLParagraphElement = document.createElement("p");

    let primAmount = localStorage.getItem("primaryAmount");

    const formattedAmount = primAmount
    ? `${new Intl.NumberFormat('sv-SE').format(Number(primAmount))} kr`
    : "0 kr";

    amountParagraph.textContent = formattedAmount;


    containerDiv.appendChild(goBackBtn)
    containerDiv.appendChild(accountParagraph)
    containerDiv.appendChild(amountParagraph)

    main.appendChild(containerDiv)

    console.log("show amount")
}

function makeDeposit(): void {
    const main = document.getElementById("main") as HTMLElement
    
    main.innerHTML = ""

    const goBackBtn: HTMLButtonElement = document.createElement("button")
    goBackBtn.classList.add("go-back-btn")
    goBackBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Tillbaka till meny`
    goBackBtn.onclick = function() {
        showMainApp()
    }
    
    const containerDiv: HTMLDivElement = document.createElement("div")
    containerDiv.classList.add("container-div")
    
    const depositInput: HTMLInputElement = document.createElement("input")
    depositInput.setAttribute("type", "number")
    depositInput.setAttribute("id", "depositInput")
    
    const depositButton: HTMLButtonElement = document.createElement("button")
    depositButton.textContent = "Sätt in"
    depositButton.onclick = function() {
        addDeposit()
    }

    depositInput.classList.add("container-input")
    depositButton.classList.add("container-btn")
    
    containerDiv.appendChild(goBackBtn)
    containerDiv.appendChild(depositInput)
    containerDiv.appendChild(depositButton)
    
    main.appendChild(containerDiv)
}

function makeWithdrawl(): void {
    const main = document.getElementById("main") as HTMLElement
    
    main.innerHTML = ""
    
    const containerDiv: HTMLDivElement = document.createElement("div")
    containerDiv.classList.add("container-div")

    const goBackBtn: HTMLButtonElement = document.createElement("button")
    goBackBtn.classList.add("go-back-btn")
    goBackBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Tillbaka till meny`
    goBackBtn.onclick = function() {
        showMainApp()
    }
    
    const withdrawInput: HTMLInputElement = document.createElement("input")
    withdrawInput.setAttribute("type", "number")
    withdrawInput.setAttribute("id", "withdrawlInput")
    
    const withdrawButton: HTMLButtonElement = document.createElement("button")
    withdrawButton.textContent = "Withdrawl"
    withdrawButton.onclick = function() {
        addWithdrawl()
    }

    withdrawInput.classList.add("container-input")
    withdrawButton.classList.add("container-btn")
    
    containerDiv.appendChild(goBackBtn)
    containerDiv.appendChild(withdrawInput)
    containerDiv.appendChild(withdrawButton)
    
    main.appendChild(containerDiv)
}

function addDeposit(): void {
    const depositInput = document.getElementById("depositInput") as HTMLInputElement
    
    const amountToDeposit = Number(depositInput.value)
    
    if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
        alert("Ange korrekt belopp att sätta in")
        return
    }
    
    let currentAmount = localStorage.getItem("primaryAmount")
    let newAmount: number
    
    if (currentAmount) {
        newAmount = Number(currentAmount) + amountToDeposit
    } else {
        newAmount = amountToDeposit
    }
    
    localStorage.setItem("primaryAmount", newAmount.toString())
    
    console.log("Updated primaryAmount:", localStorage.getItem("primaryAmount"))
    
    depositInput.value = ""
}

function addWithdrawl(): void {
    const withdrawInput = document.getElementById("withdrawlInput") as HTMLInputElement

    const amountToWithdraw = Number(withdrawInput.value)

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
        alert("Ange korrekt belopp att ta ut")
        withdrawInput.value = ""
        return
    }

    const currentAmountStr = localStorage.getItem("primaryAmount");
    const currentAmount = currentAmountStr ? Number(currentAmountStr) : 0

    if (amountToWithdraw > currentAmount) {
        alert("Otillräckligt med pengar för att ta ut detta belopp.")
        withdrawInput.value = ""
        return
    }

    const newAmount = currentAmount - amountToWithdraw

    localStorage.setItem("primaryAmount", newAmount.toString())

    console.log(`Withdrawing: ${amountToWithdraw}`)
    console.log("Updated primaryAmount:", localStorage.getItem("primaryAmount"))

    withdrawInput.value = ""
}

function logOut(){
    location.reload()
}

