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
        await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: token
            }
        });
        callback();
    } catch (_) {}
}

export function getTimeRangeString(timeRange: string): string {
    switch (timeRange) {
        case 'short_term':
            return 'Last 4 Week';
        case 'medium_term':
            return 'Last 6 Month';
        case 'long_term':
            return 'All Time';
        default:
            return 'Invalid time range.';
    }
}
