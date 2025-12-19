import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY;

if (!apiKey) throw new Error('STRIPE_SECRET_KEY is missing from environment variables. Check your .env file.');

export const stripe = new Stripe(apiKey, {
  apiVersion: '2025-08-27.basil',  
});