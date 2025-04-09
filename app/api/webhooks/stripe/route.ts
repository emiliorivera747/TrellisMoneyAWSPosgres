import { prisma } from "@/lib/prisma";
import {stripe} from '@/lib/stripe';
import Stripe from 'stripe';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
    const body = await req.text();

    const sig = req.headers.get('Stripe-Signature') as string;
    let event: Stripe.Event;

    // Verify the webhook signature
    try {
        event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err: any) {
        console.error('Error verifying webhook signature:', err);
        return new Response(`Webhook Error: ${err.message}`, {status: 400});
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = await stripe.checkout.sessions.retrieve(
                    (event.data.object as Stripe.Checkout.Session).id,
                    {
                        expand: ['line_items'],
                    }
                );
                const customer_id = session.customer as string;
                const customerDetails = session.customer_details;

                if(customerDetails?.email) {
                    const user = await prisma.user.findUnique({
                        where: {
                            email : customerDetails.email,
                        },
                    });
                    if (!user) throw new Error('User not found');

                    if(!user.customer_id) {
                        await prisma.user.update({
                            where: {
                                id: user.id,
                            },
                            data: {
                                customer_id: customer_id,
                            },
                        });
                    }

                    const lineItems = session.line_items?.data || [];

                    for (const item of lineItems) {
                 
                    }
                }


            // Handle other event types as needed
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        
    } catch (error) {
        
    }
}