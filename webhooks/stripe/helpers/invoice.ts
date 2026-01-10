import Stripe from "stripe";
import { logError } from "@/utils/api-helpers/errors/logError";
import { getStripeSubscriptionById } from "@/services/stripe/subscriptions";

/**
 * Retrieves the subscription line item from a Stripe invoice.
 *
 * This function searches through the line items of the provided Stripe invoice
 * to find the one that contains subscription item details.
 *
 * @param invoice - The Stripe invoice object to search through.
 * @returns The subscription line item if found, otherwise `undefined`.
 */
export const getSubscriptionLineFromInvoice = (invoice: Stripe.Invoice) => {
  try {
    const lineItem = invoice.lines.data.find(
      (line) => line.parent?.subscription_item_details
    );
    return lineItem;
  } catch (error) {
    logError("Error retrieving subscription line from invoice");
    return undefined;
  }
};

/**
 * Retrieves the subscription ID associated with a given invoice line item.
 *
 * @param lineItem - The invoice line item from which to extract the subscription ID.
 *                   This can be undefined, in which case the function will return undefined.
 * @returns The subscription ID if it exists, otherwise undefined.
 */
export const getSubscriptionIdForInvoiceLine = (
  lineItem: Stripe.InvoiceLineItem | undefined
) => {
  try {
    const subscriptionId =
      lineItem?.parent?.subscription_item_details?.subscription;
    return subscriptionId;
  } catch (error) {
    logError("Error retrieving subscription ID for invoice line");
    return undefined;
  }
};

/**
 * Extracts the subscription ID from a Stripe invoice.
 *
 * @param invoice - The Stripe invoice object.
 * @returns The subscription ID, or undefined if not found.
 */
export const getSubIdFromInvoice = (invoice: Stripe.Invoice) => {
  try {
    const lineItem = getSubscriptionLineFromInvoice(invoice);
    const subscriptionId = getSubscriptionIdForInvoiceLine(lineItem);
    return subscriptionId;
  } catch (error) {
    logError("Error retrieving subscription ID from invoice");
    return undefined;
  }
};

/**
 * Fetches the subscription linked to a Stripe invoice.
 *
 * @param invoice - The Stripe invoice object.
 * @returns The subscription object or `null` if not found.
 */
export const getSubscriptionFromInvoice = async (invoice: Stripe.Invoice) => {
  const id = getSubIdFromInvoice(invoice);
  const subscription = id ? await getStripeSubscriptionById(id) : null;
  return subscription;
};

/**
 * Extracts the invoice object from a Stripe event.
 *
 * @param event - The Stripe event containing the invoice data.
 * @returns The extracted Stripe invoice object.
 */
export const extractInvoiceFromStripeEvent = (event: Stripe.Event) => {
  const invoice = event.data.object as Stripe.Invoice;
  return invoice;
};
