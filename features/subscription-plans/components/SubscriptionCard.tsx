import { SubscriptionCardProps } from "@/features/subscription-plans/types/subscription";
import Link from "next/link";

/**
 * A React functional component that renders a subscription card with a title, price,
 * list of features, a payment link, and a footer description. The card is styled with
 * Tailwind CSS classes and includes hover effects.
 *
 * @component
 * @param {object} props - The props object for the SubscriptionCard component.
 * @param {string} props.title - The title of the subscription plan.
 * @param {string} props.price - The price of the subscription plan.
 * @param {string[]} props.features - An array of features included in the subscription plan.
 * @param {string} props.payment_link - The payment link URL for subscribing to the plan.
 * @param {string} props.footerDescription - A description or note displayed in the footer of the card.
 *
 * @returns {JSX.Element} A styled subscription card component.
 *
 * @example
 * <SubscriptionCard
 *   title="Premium Plan"
 *   price="$29.99/month"
 *   features={["Feature 1", "Feature 2", "Feature 3"]}
 *   payment_link="https://example.com/subscribe"
 *   footerDescription="Cancel anytime."
 * />
 */
const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  subscription_link_url,
  footerDescription,
}) => {
  return (
    <div className="subscription-card border rounded-[12px] shadow-md p-6 px-8 flex flex-col items-center backdrop-blur bg-tertiary-300/40 w-[20rem] sm:w-[25rem] hover:shadow-2xl">
      <h2 className="text-xl font-bold mb-2 text-tertiary-1000">{title}</h2>
      <p className=" text-tertiary-800 text-md font-semibold mb-4">{price}</p>
      <ul className="mb-4 w-full ">
        {features.map((feature, index) => (
          <li
            key={index}
            className="font-light text-tertiary-800 grid grid-cols-[2.2rem_1fr] my-2 sm:my-3 sm:text-[1.2rem] text-sm py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#5c7cfa"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={subscription_link_url}
        className="flex items-center justify-center w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300"
      />
      <p className="pt-6 text-sm sm:text-md text-tertiary-700 items-center w-full font-light">
        {footerDescription}
      </p>
    </div>
  );
};

export default SubscriptionCard;
