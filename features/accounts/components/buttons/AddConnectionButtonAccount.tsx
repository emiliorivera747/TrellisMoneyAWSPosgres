import { ConnectionProvider } from "@/features/manage-connections/context/ConnectionContext";
import AddAccount from "@/features/accounts/components/buttons/AddAccount";
import AddConnection from "@/features/manage-connections/AddConnection";

/**
 * A React functional component that renders a button for adding a connection.
 *
 * This component is wrapped with a `ConnectionProvider` to provide the necessary
 * context for managing connections. Inside the provider, it uses the `AddConnection`
 * component to handle the logic for adding a new connection, and the `AddAccount`
 * component to handle the account addition process.
 *
 * @component
 * @returns {JSX.Element} The rendered AddConnectionButton component.
 */
const AddConnectionButtonAccount = () => {
  return (
    <ConnectionProvider>
      <AddConnection>
        <AddAccount />
      </AddConnection>
    </ConnectionProvider>
  );
};

export default AddConnectionButtonAccount;
