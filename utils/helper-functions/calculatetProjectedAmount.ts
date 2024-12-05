export const calculateProjectedAmount = (amount: number, yearlyPercentGrowth: number, years: number) => {
    return amount + ((yearlyPercentGrowth/100)*amount)*years;
};