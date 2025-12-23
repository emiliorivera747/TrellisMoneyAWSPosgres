import { API_URL } from "@/utils/global-variables/globals";
import { AddMemberFormSchema } from "@/types/form-schemas";

const fetchHousehold = async () => {
  const res = await fetch(`${API_URL}/members`);
  if (!res.ok) throw new Error("Failed to fetch household members.");
  return res.json();
};

/**
 * Creates a new household member by sending a POST request to the API.
 * 
 * @param {Object} params - The parameters for creating a household member.
 * @param {string} params.fullName - The full name of the household member.
 * @param {string} params.email - The email address of the household member.
 * @returns {Promise<any>} A promise that resolves to the response JSON.
 * @throws {Error} If the API request fails.
 */
const createHouseholdMember = async ({
  fullName,
  email,
}: AddMemberFormSchema) => {
  const createHouseholdMember = async ({
    fullName,
    email,
  }: AddMemberFormSchema) => {
    const res = await fetch(`${API_URL}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email }),
    });
    if (!res.ok) throw new Error("Failed to add household members.");
    return res.json();
  };
};

export const householdService = {
  fetchHousehold,
  createHouseholdMember,
};
