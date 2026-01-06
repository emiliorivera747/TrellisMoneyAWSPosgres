const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div className="px-4 mt-[3rem]">id: {id}</div>;
};

export default page;
