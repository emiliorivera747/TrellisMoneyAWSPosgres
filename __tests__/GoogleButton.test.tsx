import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import GoogleButton from "@/features/auth/components/buttons/GoogleButton";
// import { createClient } from "@/utils/supabase/client";

// jest.mock("@/utils/supabase/client");

describe("GoogleButton", () => {
    // const mockCreateClient = createClient as jest.Mock;

    // beforeEach(() => {
    //     mockCreateClient.mockReturnValue({
    //         auth: {
    //             signInWithOAuth: jest.fn().mockResolvedValue({ error: null }),
    //         },
    //     });
    // });

    it("renders the button with the provided label", () => {
        render(<GoogleButton label="Sign in with Google" />);
        expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
    });

    it("shows the spinner when the button is clicked", async () => {
        render(<GoogleButton label="Sign in with Google" />);
        const button = screen.getByText("Sign in with Google");
        fireEvent.click(button);
        expect(screen.getByRole("button")).toBeDisabled();
        expect(screen.getByTestId("loading-dots")).toBeInTheDocument();
    });

    // it("calls signInWithGoogle when the button is clicked", async () => {
    //     render(<GoogleButton label="Sign in with Google" />);
    //     const button = screen.getByText("Sign in with Google");
    //     fireEvent.click(button);
    //     expect(mockCreateClient().auth.signInWithOAuth).toHaveBeenCalledWith({
    //         provider: "google",
    //         options: {
    //             redirectTo: `${window.location.origin}`,
    //         },
    //     });
    // });

    // it("enables the button if signInWithGoogle fails", async () => {
    //     mockCreateClient.mockReturnValueOnce({
    //         auth: {
    //             signInWithOAuth: jest.fn().mockResolvedValue({ error: new Error("Failed to sign in") }),
    //         },
    //     });
    //     render(<GoogleButton label="Sign in with Google" />);
    //     const button = screen.getByText("Sign in with Google");
    //     fireEvent.click(button);
    //     expect(await screen.findByText("Sign in with Google")).not.toBeDisabled();
    // });
});