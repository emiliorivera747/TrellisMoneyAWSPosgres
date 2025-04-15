const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/plaid`;

const generateProjectedNetWorth = async (
  start_year: number,
  end_year: number,
  with_inflation: boolean
) => {
  const response = await fetch(
    `${API_URL}/generate-projected-networth?start_date=${start_year}&end_date=${end_year}&with_inflation=${with_inflation}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp: new Date().toISOString() }),
    }
  );
  return response.json();
};

const generateProjectedAssetsAndNetworth = async (
  start_year: number,
  end_year: number,
  with_inflation: boolean
) => {
  const response = await fetch(
    `${API_URL}/generate-projected-assets-networth-v2?start_date=${start_year}&end_date=${end_year}&with_inflation=${with_inflation}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp: new Date().toISOString() }),
    }
  );
  return response.json();
}

const financialProjectionService = {
  generateProjectedNetWorth,
  generateProjectedAssetsAndNetworth
};

export default financialProjectionService;
