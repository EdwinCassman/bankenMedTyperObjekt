class Auth {
    private userName: string = "test"
    private userPassword: string = "test"
    private main: HTMLElement
    private bankApp: BankApp

    constructor(mainElementId: string) {
        this.main = document.getElementById(mainElementId)!
        this.bankApp = new BankApp(mainElementId, this)

        const loginForm = document.getElementById('loginForm')
        if (loginForm) {
            loginForm.addEventListener('submit', this.logIn.bind(this))
        }
    }

    private logIn(e: SubmitEvent): void {
        e.preventDefault()
        const userNameInput = document.getElementById("userName") as HTMLInputElement
        const userPasswordInput = document.getElementById("password") as HTMLInputElement

        if (userNameInput.value === this.userName && userPasswordInput.value === this.userPassword) {
            this.bankApp.showMainApp()
        } else {
            alert("Fel lösenord eller användarnamn")
        }
    }

    public logOut(): void {
        location.reload()
    }
}

class BankApp {
    private main: HTMLElement
    private auth: Auth

    constructor(mainElementId: string, authInstance: Auth) {
        this.main = document.getElementById(mainElementId)!
        this.auth = authInstance
    }

    public showMainApp(): void {
        this.main.innerHTML = ""

        const bankSection = this.createElement("div", ["bank-section"])

        const viewBalanceDiv = this.createTask("Se saldo", this.showAmount.bind(this))
        const depositDiv = this.createTask("Sätt in pengar", this.makeDeposit.bind(this))
        const withdrawDiv = this.createTask("Ta ut pengar", this.makeWithdrawl.bind(this))
        const exitDiv = this.createTask("Avsluta", this.auth.logOut.bind(this.auth))

        bankSection.append(viewBalanceDiv, depositDiv, withdrawDiv, exitDiv)
        this.main.appendChild(bankSection)
    }

    private showAmount(): void {
        this.main.innerHTML = ""

        const goBackBtn = this.createGoBackButton()
        const containerDiv = this.createElement("div", ["container-div"])
        const accountParagraph = this.createElement("p", [], "Konto:")
        const amountParagraph = this.createElement("p")

        const primAmount = localStorage.getItem("primaryAmount")
        const formattedAmount = primAmount
            ? `${new Intl.NumberFormat('sv-SE').format(Number(primAmount))} kr`
            : "0 kr"

        amountParagraph.textContent = formattedAmount

        containerDiv.append(goBackBtn, accountParagraph, amountParagraph)
        this.main.appendChild(containerDiv)
    }

    private makeDeposit(): void {
        this.main.innerHTML = ""

        const goBackBtn = this.createGoBackButton()
        const containerDiv = this.createElement("div", ["container-div"])
        const depositInput = this.createElement("input", ["container-input"]) as HTMLInputElement
        depositInput.type = "number"
        depositInput.id = "depositInput"

        const depositButton = this.createElement("button", ["container-btn"], "Sätt in")
        depositButton.onclick = this.addDeposit.bind(this)

        containerDiv.append(goBackBtn, depositInput, depositButton)
        this.main.appendChild(containerDiv)
    }

    private makeWithdrawl(): void {
        this.main.innerHTML = ""

        const goBackBtn = this.createGoBackButton()
        const containerDiv = this.createElement("div", ["container-div"])
        const withdrawInput = this.createElement("input", ["container-input"]) as HTMLInputElement
        withdrawInput.type = "number"
        withdrawInput.id = "withdrawlInput"

        const withdrawButton = this.createElement("button", ["container-btn"], "Ta ut")
        withdrawButton.onclick = this.addWithdrawl.bind(this)

        containerDiv.append(goBackBtn, withdrawInput, withdrawButton)
        this.main.appendChild(containerDiv)
    }

    private addDeposit(): void {
        const depositInput = document.getElementById("depositInput") as HTMLInputElement
        const amountToDeposit = Number(depositInput.value)

        if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
            alert("Ange korrekt belopp att sätta in")
            return
        }

        let currentAmount = localStorage.getItem("primaryAmount")
        const newAmount = currentAmount ? Number(currentAmount) + amountToDeposit : amountToDeposit

        localStorage.setItem("primaryAmount", newAmount.toString())
        depositInput.value = ""
    }

    private addWithdrawl(): void {
        const withdrawInput = document.getElementById("withdrawlInput") as HTMLInputElement
        const amountToWithdraw = Number(withdrawInput.value)

        if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
            alert("Ange korrekt belopp att ta ut")
            return
        }

        const currentAmountStr = localStorage.getItem("primaryAmount")
        const currentAmount = currentAmountStr ? Number(currentAmountStr) : 0

        if (amountToWithdraw > currentAmount) {
            alert("Otillräckligt med pengar för att ta ut detta belopp.")
            return
        }

        const newAmount = currentAmount - amountToWithdraw
        localStorage.setItem("primaryAmount", newAmount.toString())
        withdrawInput.value = ""
    }

    private createTask(title: string, onclick: () => void): HTMLDivElement {
        const taskDiv = this.createElement("div", ["bank-task"]) as HTMLDivElement
        taskDiv.onclick = onclick
        const heading = this.createElement("h3", [], title)
        taskDiv.appendChild(heading)
        return taskDiv
    }

    private createGoBackButton(): HTMLButtonElement {
        const button = this.createElement("button", ["go-back-btn"]) as HTMLButtonElement
        button.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Tillbaka till meny`
        button.onclick = this.showMainApp.bind(this)
        return button
    }

    private createElement(tag: string, classes: string[] = [], textContent?: string): HTMLElement {
        const element = document.createElement(tag)
        if (classes.length) element.classList.add(...classes)
        if (textContent) element.textContent = textContent
        return element
    }
}

new Auth("main")
