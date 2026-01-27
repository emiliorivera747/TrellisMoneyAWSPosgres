const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const fetchProjectedNetWorth = async (
  startYear: number,
  endYear: number,
  inflationAdjusted: boolean
) => {
  const response = await fetch(
    `${API_URL}/generate-projected-networth?startDate=${startYear}&endDate=${endYear}&inflationAdjusted=${inflationAdjusted}`,
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

const fetchProjectedAssetsAndNetworth = async (
  startYear: number,
  endYear: number,
  inflationAdjusted: boolean
) => {
  const response = await fetch(
    `${API_URL}/generate-projected-assets-networth-v2?startDate=${startYear}&endDate=${endYear}&inflationAdjusted=${inflationAdjusted}`,
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

const financialProjectionService = {
  fetchProjectedNetWorth,
  fetchProjectedAssetsAndNetworth,
};

export default financialProjectionService;
