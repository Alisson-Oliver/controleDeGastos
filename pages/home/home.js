function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch(() => {
        alert("Erro ao fazer logout")
    })
}

firebase.auth().onAuthStateChanged(user => {
    if(user){
        findTransactions(user);
    }
})

function newTransaction() {
    window.location.href = "../transaction/transaction.html"
}

function findTransactions(user){
    showLoading();
    
    transactionService.findByUser(user)
    .then(transactions => {
        hideLoading();
        addTransactionToScreen(transactions);
    })
    .catch(error => {
        hideLoading()
        console.log(error);
        alert("Erro ao recuperar transações")
    })
}

function addTransactionToScreen(transactions) {
    const orderedList = document.getElementById("transactions");

    transactions.forEach(transaction => {
        const li = createTransactionListItem(transaction);

        li.appendChild(createDeleteButton(transaction));

        li.appendChild(createLabeledParagraph("Data: ", formatDate(transaction.date)));

        li.appendChild(createLabeledParagraph("Valor: ", formatMoney(transaction.money)));

        li.appendChild(createLabeledParagraph("Tipo de Transação: ", transaction.transactionType));

        if (transaction.description) {
            li.appendChild(createLabeledParagraph("Descrição: ", transaction.description));
        }

        orderedList.appendChild(li);
    });
}

function createLabeledParagraph(label, value) {
    const paragraph = document.createElement('p');
    
    const strongLabel = document.createElement('strong');
    strongLabel.textContent = label;

    paragraph.appendChild(strongLabel);
    paragraph.appendChild(document.createTextNode(value));
    
    return paragraph;
}


function createTransactionListItem(transaction){
    const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.id = transaction.uid;
        li.addEventListener('click', () => {
            window.location.href = "../transaction/transaction.html?uid=" + transaction.uid;
        })
        
        return li;
}

function createDeleteButton(transaction){
    const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Remover";
        deleteButton.classList.add('outline', "danger");
        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            askRemoveTransaction(transaction);
        })

        return deleteButton;
}

function createParagraph(value) {
    const element = document.createElement('p');
    element.innerHTML = value;
    return element;
}

function askRemoveTransaction(transaction){
    const shouldRemove = confirm("Deseja remover a transação?");
    if(shouldRemove){
        removeTransaction(transaction)
    }
}

function removeTransaction(transaction){
    showLoading();
    
    transactionService.remove(transaction)
    .then(() => {
        hideLoading();
        document.getElementById(transaction.uid).remove();
    })
    .catch(error => {
        hideLoading();
        console.log(error)
        alert("Erro ao remover transação")
    })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br')
}

function formatMoney(money) {
    return `${money.currency}${money.value.toFixed(2)}`
}

