import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";
import { getInvoiceFromEvent } from "@/webhooks/stripe/helpers/invoice";
import { getCustomerIdFromSub } from "../helpers/customers";



/**
 * This event handler endpoint processes invoice.paid event.
 */
const handlePaymentActionRequired = async (event: Stripe.Event) => {
  try {
    const invoice = getInvoiceFromEvent(event);
    const subscription = await getSubscriptionByInvoice(invoice);
    
    let user;
    if(subscription){
      const customer_id = getCustomerIdFromSub(subscription);
    }
  } catch (error) {
    console.error("Error in handlePaymentActionRequired:", error);
  }
};

export default handlePaymentActionRequired;
