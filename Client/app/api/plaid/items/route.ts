import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
 try {
    const body = await req.json();
    const tempItem = body.item;

    // Create the item
    const item = await prisma.item.create({
        data: {
            item_id: tempItem.item_id || '',
            institution_id: tempItem.institution_id || '',
            available_products: tempItem.available_products || '',
            billed_products: tempItem.billed_products || '',
            products: tempItem.products || '',
            error: tempItem.error || '',
            user_id:  tempItem.user_id || '',
            access_token: tempItem.access_token  || '',
            update_type: tempItem.update_type || '',
            consent_expiration_time: tempItem.consent_expiration_time  || '',
            institution_name: tempItem.institution_name || '',
            webhook: tempItem.webhook || '',
            auth_method: tempItem.auth_method || '',
            consented_products: tempItem.consented_products || '',
            consented_data_scopes: tempItem.consented_data_scopes || '',
            consented_use_cases: tempItem.consented_use_cases || '',
            request_id: tempItem.request_id || '',
        }
    });

    return NextResponse.json({ message: "Hello, World!", item: item });
 } catch (error) {
   return NextResponse.json({ error: (error as any).message }, { status: 500 });
 }
}


