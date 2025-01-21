import { useState, useEffect } from 'react';

const useGenerateToken = () => {
    const [linkToken, setLinkToken] = useState<string | null>(null);

    const generateToken = async () => {
        const response = await fetch("/api/plaid/create-link-token", {
            method: "POST",
        });
        const data = await response.json();
        setLinkToken(data.link_token);
    };

    useEffect(() => {
        generateToken();
    }, []);

    return linkToken;
};

export default useGenerateToken;