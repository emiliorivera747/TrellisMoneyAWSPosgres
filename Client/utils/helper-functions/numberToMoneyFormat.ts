function numberToMoneyFormat(amount: number): string {
    if (amount === undefined || amount === null) {
        return '0.00';
    }
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export default numberToMoneyFormat;