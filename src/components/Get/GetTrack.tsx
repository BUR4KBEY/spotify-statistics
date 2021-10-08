import { useEffect, useState } from 'react';

import { PlusCircleIcon } from '@heroicons/react/solid';

import useGetRequest from '../../requests/useGetRequest';
import usePostRequest from '../../requests/usePostRequest';
import { getTimeRangeString } from '../../utils/functions';
import { InfoResponse, Playlist, Profile, Track } from '../../utils/interfaces';
import Button from '../Button/Button';
import Error from '../Error';
import Fetching from '../Fetching';
import ArtistInfo from '../Info/ArtistInfo';
import TrackInfo from '../Info/TrackInfo';

interface Props {
    timeRange: string;
    profile: Profile;
}

export default function GetTrack({ timeRange, profile }: Props) {
    const { data, fetching, error } = useGetRequest<InfoResponse<Track>>(`me/top/tracks?limit=50&time_range=${timeRange}`);

    const [trackCount, setTrackCount] = useState<any>([]);

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

    useEffect(() => {
        if (!data) return;

        var cache: any = {};

        for (const item of data.items) {
            if (cache[item.artists[0].name]) {
                cache[item.artists[0].name]++;
            } else {
                cache[item.artists[0].name] = 1;
            }
        }

        cache = Object.entries(cache).sort((a: any, b: any) => b[1] - a[1]);

        setTrackCount(cache);
    }, [data]);

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
                <div className="mb-8 flex flex-col justify-center items-center">
                    <strong className="font-bold text-2xl text-purple-200 mb-4">Track Counts By Artist</strong>
                    <div className="flex flex-col">
                        {trackCount.map((x: any) => (
                            <div className="flex gap-4">
                                <strong className="font-bold text-base text-pink-400 mb-4">{x[0]}</strong>
                                <strong className="font-bold text-base text-pink-200 mb-4">{x[1]}</strong>
                            </div>
                        ))}
                    </div>
                </div>

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
