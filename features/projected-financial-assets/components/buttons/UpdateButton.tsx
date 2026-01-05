import { Activity, useRef } from "react";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";

/**
 * UpdateButton Component
 *
 * This component renders an "Update" button that is conditionally visible based on the current mode
 * from the dashboard context. It also displays a loading state when assets are being updated.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered UpdateButton component.
 *
 * @remarks
 * - The button's visibility is controlled by the `mode` value from the `useDashboardContext` hook.
 * - The loading state of the button is determined by the `isLoadingAssets` value from the `useUpdateAssets` hook.
 *
 * @dependencies
 * - `useRef` is used to create a reference to the button element.
 * - `useDashboardContext` provides the current mode of the dashboard.
 * - `useUpdateAssets` provides the loading state for asset updates.
 *
 * @example
 * ```tsx
 * <UpdateButton />
 * ```
 */
const UpdateButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { mode } = useDashboardFilters();
  return (
    <Activity mode={mode === "edit" ? "visible" : "hidden"}>
      <div className="flex justify-center items-center">
        <PrimarySubmitButton
          text={"Update"}
          className="w-[8rem] font-semibold text-sm h-[3rem]"
          ref={buttonRef}
        />
      </div>
    </Activity>
  );
};

export default UpdateButton;
