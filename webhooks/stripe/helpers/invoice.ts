import Stripe from "stripe";
import { logError } from "@/utils/api-helpers/errors/logError";
import { getSubscriptionById } from "@/services/stripe/subscriptions";

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
 * Retrieves the subscription ID from a Stripe invoice.
 *
 * This function extracts the subscription line item from the provided Stripe invoice
 * and then retrieves the corresponding subscription ID associated with that line item.
 *
 * @param invoice - The Stripe invoice object from which the subscription ID will be extracted.
 * @returns The subscription ID associated with the invoice.
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
 * Retrieves the subscription associated with a given Stripe invoice.
 *
 * This function extracts the subscription ID from the provided invoice
 * and fetches the corresponding subscription details. If the subscription
 * ID cannot be determined, it returns `null`.
 *
 * @param invoice - The Stripe invoice object from which the subscription
 *                  information will be extracted.
 * @returns The subscription object if the subscription ID is found,
 *          otherwise `null`.
 */
export const getSubscriptionFromInvoice = async (invoice: Stripe.Invoice) => {
  const id = getSubIdFromInvoice(invoice);
  const subscription = id ? await getSubscriptionById(id) : null;
  return subscription;
};

/**
 * Extracts the invoice object from a Stripe event.
 *
 * @param event - The Stripe event containing the invoice data.
 * @returns The extracted Stripe invoice object.
 */
export const getInvoiceFromEvent = (event: Stripe.Event) => {
  const invoice = event.data.object as Stripe.Invoice;
  return invoice;
};
