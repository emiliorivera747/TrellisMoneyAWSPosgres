import prisma from "@/lib/prisma";
import { ItemGetResponse } from "plaid";
import { AxiosResponse } from "axios";

/**
 * Adds the item to the database.
 *
 * @param user_id - The ID of the authenticated user
 * @param item - The item details retrieved from Plaid
 * @param access_token - The access token associated with the item
 * @returns The created item record or an error
 */
export const addItem = async (
  user_id: string,
  item: AxiosResponse<ItemGetResponse, any>,
  access_token: string,
  household_id: string
) => {
  // Create a new item record in the database
  const res = await prisma.item.create({
    data: {
      item_id: item.data.item.item_id,
      institution_id: item.data.item.institution_id || "",
      webhook: item.data.item.webhook || "",
      available_products: item.data.item.available_products,
      billed_products: item.data.item.billed_products,
      products: item.data.item.products,
      consented_products: item.data.item.consented_products,
      consent_expiration_time: item.data.item.consent_expiration_time || "",
      update_type: item.data.item.update_type,
      created_at: item.data.item.created_at,
      consented_use_cases: item.data.item.consented_use_cases,
      consented_data_scopes: item.data.item.consented_data_scopes,
      user_id,
      household_id,
      access_token,
      request_id: item.data.request_id,
    },
  });
  return res;
};
