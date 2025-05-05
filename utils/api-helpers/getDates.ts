export const getDates = (searchParams: URLSearchParams) =>{

  const start_year = searchParams.get("start_date")
  ? parseInt(searchParams.get("start_date") as string, 10)
  : new Date().getFullYear();

  const end_year = searchParams.get("end_date")
  ? parseInt(searchParams.get("end_date") as string, 10)
  : new Date().getFullYear() + 40;

  return {start_year, end_year};
}