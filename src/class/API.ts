import axios from 'axios';

export default class API {
    static get<T>(endpoint: string, token: string): Promise<T> {
        return new Promise(
            async (resolve, reject) =>
                await axios
                    .get(`https://api.spotify.com/v1/${endpoint}`, {
                        headers: {
                            Authorization: token
                        }
                    })
                    .then(response => resolve(response.data))
                    .catch(error => {
                        if (error.response?.data?.error?.message) reject(error.response.data.error.message);
                        else reject(error);
                    })
        );
    }
}
