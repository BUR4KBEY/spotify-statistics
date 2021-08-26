import axios from 'axios';
import { oneLine } from 'common-tags';

export function getHash<T>(): T {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial: any, item) => {
            if (item) {
                const parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
}

export function getAuthURL(clientId: string, redirectURI: string, scopes: string[]): string {
    return oneLine`https://accounts.spotify.com/authorize
    ?response_type=token
    &client_id=${clientId}
    &redirect_uri=${redirectURI}
    &scope=${scopes.join('%20')}`.replace(/ /g, '');
}

export async function isTokenValid(token: string, callback: () => void) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: token
            }
        });

        console.log(response.data);
        callback();
    } catch (_) {
        console.log('error');
    }
}
