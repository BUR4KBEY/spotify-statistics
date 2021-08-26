import { useCallback, useContext, useEffect, useState } from 'react';

import API from '../class/API';
import { AuthContext } from '../context/AuthContext';

export default function useRequest<T>(endpoint: string) {
    const { token } = useContext(AuthContext);

    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const loadData = useCallback(async () => {
        try {
            setFetching(true);

            const body = await API.get<T>(endpoint, token!);

            setFetching(false);
            setData(body);
        } catch (error) {
            if (error.response.status === 429) {
                setTimeout(() => loadData(), Number(error.response.headers['Retry-After']));
            } else {
                setFetching(false);
                setError(error.message ? error.message : error);
            }
        }
    }, [token, endpoint]);

    useEffect(() => {
        if (!token) return;
        loadData();
    }, [token, endpoint, loadData]);

    return { data, fetching, error };
}
