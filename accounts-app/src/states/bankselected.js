var BankSelected = (function() {
    var bankname = "";

    let getBankSelected = () => {
      return bankname

    }
    let setBankSelected = (newBankSelected) => {
      bankname = newBankSelected
    }

    return {
      getBankSelected,
      setBankSelected
    }

  })();

  export default BankSelected;
