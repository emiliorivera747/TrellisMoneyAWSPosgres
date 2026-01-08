import { TableBody, TableCell, TableRow } from "@/components/ui/table";

/**
 * NoAssets Component
 *
 * This functional component renders a message indicating that there are no holdings
 * currently available. It is designed to be used within a table structure, displaying
 * a single row with a centered message.
 *
 * @component
 *
 * @example
 * // Usage example:
 * <NoAssets />
 *
 * @returns {JSX.Element} A table body containing a single row with a message.
 */
const NoAssets = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="px-4 py-3 text-tertiary-700 font-light text-center text-[1rem] h-64 border-t">
          You currently do not have any holdings
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default NoAssets;
