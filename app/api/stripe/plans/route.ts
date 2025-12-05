// app/api/plans/route.ts
export async function GET() {
  const url = "https://api.stripe.com/v1/prices";

  const params = new URLSearchParams({
    active: "true",
    limit: "100",
  });

  params.append("expand[]", "data.product");

  const res = await fetch(`${url}?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    return new Response(await res.text(), { status: res.status });
  }

  const data = await res.json();
  return Response.json(data.data);
}
