import { NextRequest, NextResponse } from 'next/server'; 
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';
import { prisma } from "@/lib/prisma";

const config = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '',
        'PLAID-SECRET': process.env.PLAID_SECRET || '',
      },
    },
  });

const client = new PlaidApi(config);

export async function POST(req: NextRequest) {
  const { public_token } = await req.json();
  try {
    const response = await client.itemPublicTokenExchange({ public_token });
    const { access_token } = response.data;

    // update the access token in the database
    const item = await client.itemGet({ access_token });

    // If the item already exists, remove it
    const itemFound = await prisma.item.findUnique({
      where: {
        item_id: item.data.item.item_id
      }
    });

    if (itemFound) await client.itemRemove({ access_token });

    // Add the new item
    // await prisma.item.create({
    //   data: {
    //     item_id: item.data.item.item_id,
    //     institution_id: item.data.item.institution_id || '',
    //     institution_name: item.data.item.institution_name || '',
    //     user_id: '88aaaacc-8638-4de3-b20b-5408377596be',
    //     access_token,
    //     request_id: item.data.request_id,
    //   }
    // });

    return NextResponse.json({ access_token });
  } catch (error) {
    return NextResponse.json({ error: 'Error exchanging public token' }, { status: 500 });
  }
}