// Creates a household name based on a full name or email
export const createHouseholdName = (
    fullName: string | undefined,
    email: string | undefined
) => {
    // If fullName exists, format it based on whether it ends with "s"
    // Otherwise, use the email prefix to create the household name
    const householdName = fullName
        ? fullName.endsWith("s")
            ? `${fullName}' Household`
            : `${fullName}'s Household`
        : email?.split("@")[0] + "'s Household";

    return householdName;
};