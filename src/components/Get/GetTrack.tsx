import { useEffect } from 'react';

import { PlusCircleIcon } from '@heroicons/react/solid';

import useGetRequest from '../../requests/useGetRequest';
import usePostRequest from '../../requests/usePostRequest';
import { getTimeRangeString } from '../../utils/functions';
import { InfoResponse, Playlist, Profile, Track } from '../../utils/interfaces';
import Button from '../Button/Button';
import Error from '../Error';
import Fetching from '../Fetching';
import TrackInfo from '../Info/TrackInfo';

interface Props {
    timeRange: string;
    profile: Profile;
}

export default function GetTrack({ timeRange, profile }: Props) {
    const { data, fetching, error } = useGetRequest<InfoResponse<Track>>(`me/top/tracks?limit=50&time_range=${timeRange}`);

    const plRequest = usePostRequest<Playlist>(`users/${profile.id}/playlists`, {
        name: `S4S - Top Tracks - ${getTimeRangeString(timeRange)}`,
        description: 'https://stats4spotify.netlify.app/'
    });

    const trackRequest = usePostRequest(`playlists/${plRequest.data?.id}/tracks`, {
        uris: data?.items.map(item => item.uri)
    });

    const createPlaylist = () => {
        if (plRequest.error) alert(plRequest.error);
        else if (trackRequest.error) alert(trackRequest.error);
        else plRequest.post();
    };

    useEffect(() => {
        if (plRequest.data) trackRequest.post();
    }, [plRequest.data]);

    useEffect(() => {
        if (trackRequest.data) window.open(plRequest.data?.external_urls.spotify, '_blank');
    }, [trackRequest.data]);

    useEffect(() => {
        if (plRequest.error) alert(plRequest.error);
    }, [plRequest.error]);

    useEffect(() => {
        if (trackRequest.error) alert(trackRequest.error);
    }, [trackRequest.error]);

    return data ? (
        <>
            <Button
                className={`text-white ${plRequest.fetching || trackRequest.fetching ? 'bg-gray-600 cursor-default' : 'bg-green-600 hover:bg-green-400'}`}
                child={<PlusCircleIcon className="h-5 w-5 mr-3" />}
                text="Create Playlist"
                onClick={createPlaylist}
                disabled={plRequest.fetching || trackRequest.fetching}
            />
            <div className="mb-8">
                {data.items.map((item, index) => (
                    <TrackInfo key={`track-${index}`} track={item} index={index} />
                ))}
            </div>
        </>
    ) : fetching ? (
        <Fetching color="text-purple-400" />
    ) : (
        <Error message={error!} />
    );
}
