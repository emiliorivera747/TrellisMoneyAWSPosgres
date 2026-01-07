
/**
 * A skeleton component for the side navigation bar, used as a placeholder
 * while the actual content is loading.
 *
 * @returns {JSX.Element} The rendered skeleton component for the side navigation.
 */
const SideNavSkeleton = () => {
    return (
        <aside className="sm:border-tertiary-200 flex flex-col sm:flex-row justify-start w-full sm:justify-center sm:w-24 2xl:w-48 min-w-24 sticky text-white sm:border-r border-tertiary-300 border-box h-screen animate-pulse">
            <nav className="flex flex-row sm:flex-col pb-4 justify-between items-center my-[3.2rem]">
                <ul className="flex flex-row sm:flex-col w-full sm:justify-normal sm:items-center items-center">
                    <li className="h-[3rem] w-[3rem] sm:mb-4 bg-tertiary-300 rounded-[100%]"></li>
                    {[...Array(6)].map((_, index) => (
                        <li
                            key={index}
                           className="h-[3rem] w-[3rem] sm:mb-2 bg-tertiary-200 rounded-[12px]"
                        ></li>
                    ))}
                </ul>
                <div className="h-[3rem] w-[3rem] bg-tertiary-200 rounded-[100%]"></div>
            </nav>
        </aside>
    );
};

export default SideNavSkeleton;