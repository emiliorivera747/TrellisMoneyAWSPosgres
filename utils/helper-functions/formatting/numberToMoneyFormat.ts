function numberToMoneyFormat(amount: number): string {
    if (amount === undefined || amount === null) {
        return '0.00';
    }
    const isNegative = amount < 0;
    const absoluteAmount = Math.abs(amount);
    const formattedAmount = `$${absoluteAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    return isNegative ? `-${formattedAmount}` : formattedAmount;
}

export default numberToMoneyFormat;