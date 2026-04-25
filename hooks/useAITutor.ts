import { useState, useEffect } from 'react';

const useAITutor = (query) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchResponse = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/ai-tutor', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setResponse(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResponse();
    }, [query]);

    return { response, loading, error };
};

export default useAITutor;