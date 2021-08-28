import axios, { Method } from 'axios';

export default class API {
    private static request<T>(method: Method, endpoint: string, token: string, data?: any): Promise<T> {
        return new Promise(
            async (resolve, reject) =>
                await axios({
                    method,
                    url: `https://api.spotify.com/v1/${endpoint}`,
                    headers: {
                        Authorization: token
                    },
                    data
                })
                    .then(response => resolve(response.data))
                    .catch(error => {
                        if (error.response?.data?.error?.message) reject(error.response.data.error.message);
                        else reject(error);
                    })
        );
    }

    static get<T>(endpoint: string, token: string) {
        return this.request<T>('GET', endpoint, token);
    }

    static post<T>(endpoint: string, token: string, body: any): Promise<T> {
        return this.request<T>('POST', endpoint, token, body);
    }
}
