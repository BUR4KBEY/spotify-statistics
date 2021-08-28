import { useCallback, useContext, useState } from 'react';

import API from '../class/API';
import { AuthContext } from '../context/AuthContext';

export default function usePostRequest<T>(endpoint: string, body: any) {
    const { token } = useContext(AuthContext);

    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const post = useCallback(async () => {
        try {
            setFetching(true);

            const responseBody = await API.post<T>(endpoint, token!, body);

            setFetching(false);
            setData(responseBody);
        } catch (error) {
            if (error.response?.status === 429) {
                setTimeout(() => post(), Number(error.response.headers['Retry-After']));
            } else {
                setFetching(false);
                setError(error.message ? error.message : error);
            }
        }
    }, [token, endpoint, body]);

    return { post, data, fetching, error };
}
