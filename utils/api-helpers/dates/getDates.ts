export const getDates = (searchParams: URLSearchParams) =>{

  const startYear = searchParams.get("start_date")
  ? parseInt(searchParams.get("start_date") as string, 10)
  : new Date().getFullYear();

  const endYear = searchParams.get("end_date")
  ? parseInt(searchParams.get("end_date") as string, 10)
  : new Date().getFullYear() + 40;

  return {startYear, endYear};
}