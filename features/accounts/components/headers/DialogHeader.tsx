// Components
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";


// Custom dialog header component that accepts a title as a prop
const CustomDialogHeader = ({ title }: { title: string }) => {
    return (
        <DialogHeader className="border-b border-tertiary-300 flex justify-between h-[3rem]">
            {/* Dialog title with specific styling */}
            <DialogTitle className="pl-4 text-md font-semibold text-tertiary-900">
                {title}
            </DialogTitle>
        </DialogHeader>
    );
};

export default CustomDialogHeader;
