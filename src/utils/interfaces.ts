import { Dispatch } from 'react';

export interface Route {
    component: ((props: any) => JSX.Element) | null;
    path: string;
    props?: any;
    children?: Route[];
}

export interface RouteResult {
    path: string;
    route: Route;
}

export interface AuthSuccessResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
}

export interface AuthAction {
    type: 'SET' | 'CLEAR';
    payload?: AuthSuccessResponse;
}

export interface AuthContextState {
    token: string | null;
    dispatch: Dispatch<AuthAction>;
}

export interface Profile {
    country: string;
    display_name: string;
    email: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

export interface Followers {
    href: null;
    total: number;
}

export interface Image {
    height: null;
    url: string;
    width: null;
}

export interface ExternalUrls {
    spotify: string;
}

export interface ExternalIDS {
    isrc: string;
}

export interface AlbumArtist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface Album {
    album_type: string;
    artists: AlbumArtist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface Track {
    album: Album;
    artists: AlbumArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIDS;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export interface InfoResponse<T> {
    items: T[];
    total: number;
    limit: number;
    offset: number;
    previous: null;
    href: string;
    next: null;
}

export interface Artist {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface Owner {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: any[];
    name: string;
    owner: Owner;
    primary_color: null;
    public: boolean;
    snapshot_id: string;
    tracks: InfoResponse<Track>;
    type: string;
    uri: string;
}
