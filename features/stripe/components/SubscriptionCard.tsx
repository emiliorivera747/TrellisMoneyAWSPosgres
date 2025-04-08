import PaymentLink from "@/features/stripe/components/PaymentLink";
interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  payment_link: string;
  footerDescription: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  payment_link,
  footerDescription,
}) => {
  return (
    <div className="subscription-card border rounded-[12px] shadow-md p-6 px-8 flex flex-col items-center backdrop-blur bg-tertiary-300/40 w-[25rem] hover:shadow-2xl">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className=" text-tertiary-800 text-md font-semibold mb-4">{price}</p>
      <ul className="mb-8 w-full">
        {features.map((feature, index) => (
          <li
            key={index}
            className="text-gray-700 flex flex-row gap-2 items-center py-3 text-md"
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
      <PaymentLink
        paymentLink={"#"}
        href={"/sign-up"}
        text={"Subscribe"}
      />
      <p className="pt-8 text-md text-tertiary-700 items-center w-full">
        {footerDescription}
      </p>
    </div>
  );
};

export default SubscriptionCard;
