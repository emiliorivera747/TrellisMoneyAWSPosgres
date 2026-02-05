// Components
import NavBar from "@/components/nav-bars/SecondaryNavbar";

export default function NotFound() {
  return (
    <div>
      <NavBar />
      <header className="flex h-[90vh] flex-col items-center justify-center text-center ">
        <div className=" -translate-y-[20%] sm:-translate-y-[20%] w-[86%] sm:w-[90%] flex flex-col justify-center items-center gap-4">
          <h1 className="text-4xl font-bold">404 Page Not Found</h1>
          <p className="text-primary-1000 font-light">
            Sorry, we couldn&apos;t find this page.
          </p>
        </div>
      </header>
    </div>
  );
}
