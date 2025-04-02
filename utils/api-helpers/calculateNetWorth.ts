import { AccountBase } from "plaid";
import {Account} from '@/types/plaid';
export function calculateNetWorth(accounts: Account[]): { netWorth: number, assets: number, liabilities: number } {
    let netWorth = 0;
    let assets = 0;
    let liabilities = 0;

    accounts.forEach(account => {
        const { type, subtype } = account;
        const balance = account?.current ?? 0;

        console.log("ACCOUNT: ", balance);

        // Handle DEPOSITORY account types (cash holding)
        if (type === 'depository') {
            if (['checking', 'savings', 'hsa', 'cd', 'money market', 'paypal', 'prepaid', 'cash management', 'ebt'].includes(subtype || '')) {
                netWorth += Number(balance);
                assets += Number(balance);
            }
        }

        // Handle CREDIT account types (liabilities)
        else if (type === 'credit') {
            if (subtype === 'credit card' || subtype === 'paypal') {
                netWorth -= Number(balance);
                liabilities += Number(balance);
            }
        }

        // Handle LOAN account types (liabilities)
        else if (type === 'loan') {
            if (['auto', 'business', 'commercial', 'construction', 'consumer', 'home equity', 'mortgage', 'student', 
                'line of credit', 'overdraft', 'other'].includes(subtype || '')) {
                netWorth -= Number(balance);
                liabilities += Number(balance);
            }
        }

        // Handle INVESTMENT account types (assets)
        else if (type === 'investment') {
            if (['401a', '401k', '403B', '457b', 'brokerage', 'cash isa', 'crypto exchange', 'education savings account', 
                'fixed annuity', 'gic', 'hsa', 'ira', 'isa', 'keogh', 'lif', 'lira', 'lrsp', 'lrif', 'mutual fund', 
                'non-custodial wallet', 'non-taxable brokerage account', 'other', 'pension', 'prif', 'profit sharing plan', 
                'qshr', 'rdsp', 'resp', 'retirement', 'roth', 'roth 401k', 'rrif', 'rrsp', 'rrif', 'sipp', 'stock plan', 
                'tfsa'].includes(subtype || '')) {
                netWorth += Number(balance);
                assets += Number(balance);
            }
        }

        // Handle other account types that are difficult to categorize (e.g., trust, life insurance, other)
        else if (type === 'other') {
            if (subtype === 'trust' || subtype === 'life insurance' || subtype === 'variable annuity' || subtype === 'other annuity') {
                netWorth += Number(balance);
                assets += Number(balance);
            }
        }
    });

    return { netWorth, assets, liabilities };
}
