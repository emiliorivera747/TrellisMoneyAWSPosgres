import Stripe from "stripe";

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
  const lineItem = invoice.lines.data.find(
    (line) => line.parent?.subscription_item_details
  );
  return lineItem;
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
  const subscriptionId =
    lineItem?.parent?.subscription_item_details?.subscription;
  return subscriptionId;
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
  const lineItem = getSubscriptionLineFromInvoice(invoice);
  const subscriptionId = getSubscriptionIdForInvoiceLine(lineItem);
  return subscriptionId;
};
