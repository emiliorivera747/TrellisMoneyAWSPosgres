import { NextResponse, NextRequest } from "next/server";
import { getItemsByUserId } from "@/utils/prisma/item/itemsService";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";
import { getInvestments } from "@/utils/prisma/investments/getInvestments";
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { withAuth } from "@/lib/protected";


export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      /**
       * Extract the timestamp from the query parameters
       * and validate it to ensure it is in the correct format.
       */
      const { searchParams } = new URL(request.url);
      const timestamp = searchParams.get("timestamp");
      validateTimestamp(timestamp);

      /**
       * Retrieve the items associated with the authenticated user.
       * If no items are found, throw an appropriate error.
       */
      const items = await getItemsByUserId(user?.id || "");
      noItemsError(items);

      /**
       * Fetch the investment holdings data for the user's items
       * based on the provided timestamp.
       */
      const investments = await getInvestments(items, timestamp || "");

      // Return the investment data as a JSON response with a 200 status code.
      return NextResponse.json({ data: investments }, { status: 200 });
    } catch (error) {
      // Handle any errors and return a 500 status code with an error message.
      return NextResponse.json(
        { error: "Error fetching investment holdings data" },
        { status: 500 }
      );
    }
  });
}
