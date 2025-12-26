/**
 * A functional component that renders a primary modal header.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title to be displayed in the header.
 * @returns {JSX.Element} A styled `<h1>` element representing the modal header.
 */
const PrimaryModalHeader = ({ title }: { title: string }) => {
  return <h1 className="text-tertiary-700 font-light text-[1rem] pb-2">{title}</h1>;
};

export default PrimaryModalHeader;
