import { useState, useEffect } from "react";

const useGenerateToken = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  console.log("linkToken", linkToken);
  const generateToken = async (user_id: string) => {
    setLinkToken(null);

    try {
      const res = await fetch("/api/plaid/create-link-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });
      if (!res.ok) throw new Error("Failed to create link token");
      const data = await res.json();
      setLinkToken(data.link_token);
      return data.link_token;
    } catch (error) {
      setLinkToken(null);
      throw error;
    }
  };

  return { linkToken, generateToken };
};

export default useGenerateToken;
