

"use strict";

let accountInfoList = [];

function Account() {
    let accountName;
    let balance;

    let setAccountName = function(name) {
        accountName = name;
    }

    let deposit = function(bal) {
        balance = bal;
    }

    let getName =  function() {
        return accountName;
    }

    let getBalance =  function() {
        return balance;
    }

    return {
        setAccountName: setAccountName,
        deposit: deposit,
        getName: getName,
        getBalance: getBalance,
    };
}


let manageAccounts = (function() {

    let refreshList = function() {
        let accountListField = document.getElementById("acc-list");
        let accounts = "";


        for(let accIndex in accountInfoList) {
            accounts += ""
            accounts += "Account Name: " + accountInfoList[accIndex].getName();
            accounts += ", Deposit: " + accountInfoList[accIndex].getBalance();
            accounts += "\n";
        }

        accountListField.value = accounts;
    }

    return function() {

        let nameField = document.getElementById("acc-name");
        let depositField = document.getElementById("deposit-amount");

        let tmpAccount = new Account();;
        tmpAccount.setAccountName(nameField.value);
        tmpAccount.deposit(depositField.value);

        nameField.value = "";
        depositField.value = "";

        accountInfoList.push(tmpAccount);

        refreshList();
    }
})();

document.getElementById("add-acc").onclick = manageAccounts;



