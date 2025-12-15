/**
 * A skeleton component that serves as a placeholder for the Pricing Section
 * while the actual content is loading. It uses a shimmering animation to
 * indicate loading state.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the skeleton structure
 * for the Pricing Section.
 *
 * @remarks
 * - The component renders three placeholder cards, each simulating the layout
 *   of a pricing card.
 * - Each card includes placeholders for a title, subtitle, a list of features,
 *   a button, and a footer text.
 * - The `animate-pulse` class is used to create a shimmering effect for the
 *   loading state.
 *
 * @example
 * ```tsx
 * import PricingSectionSkeleton from './PricingSectionSkeleton';
 *
 * const App = () => (
 *   <div>
 *     <PricingSectionSkeleton />
 *   </div>
 * );
 * ```
 */
const PricingSectionSkeleton = () => {
  return (
    <section className="h-auto min-h-screen sm:min-h-screen w-full flex flex-col border-t border-tertiary-300 pb-10">
      <h1 className="text-center text-3xl font-bold text-tertiary-900 bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-transparent mt-[5rem]">
        Start your Trellis Money membership
      </h1>
      <p className="text-center text-md bg-gradient-to-r from-tertiary-800 to-tertiary-600 bg-clip-text text-transparent mt-4">
        Manage your finances. Cancel anytime.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-8 animate-pulse">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="border border-tertiary-400 rounded-[12px] shadow-md p-6 px-8 flex flex-col items-center backdrop-blur bg-tertiary-300/40 w-[20rem] sm:w-[25rem]"
          >
            <div className="h-6 w-32 bg-tertiary-24"></div>
            <div className="h-5 w-20 bg-tertiary-400 rounded mb-6"></div>
            <ul className="w-full mb-6">
              {Array.from({ length: 8 }).map((_, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center gap-2 mb-3 sm:mb-4"
                >
                  <div className="h-6 w-6 bg-tertiary-400 rounded-full"></div>
                  <div className="h-4 w-full bg-tertiary-400 rounded"></div>
                </li>
              ))}
            </ul>
            <div className="h-10 w-32 bg-tertiary-400 rounded mb-6"></div>
            <div className="h-4 w-48 bg-tertiary-400 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSectionSkeleton;
