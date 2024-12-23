
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/plaid`;

const generateProjectedNetWorth = async (start_year: number, end_year: number) => {
  const response = await fetch(`${API_URL}/generateProjectedNetWorth?start_date=${start_year}&end_date=${end_year}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timestamp: new Date().toISOString() }),
  });
  return response.json();
};

const financialProjectionService = {
  generateProjectedNetWorth,
};

export default financialProjectionService;
