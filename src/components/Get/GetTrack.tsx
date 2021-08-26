import { InfoResponse, Track } from '../../utils/interfaces';
import useRequest from '../../utils/useRequest';
import Error from '../Error';
import Fetching from '../Fetching';
import TrackInfo from '../Info/TrackInfo';

interface Props {
    timeRange: string;
}

export default function GetTrack({ timeRange }: Props) {
    const { data, fetching, error } = useRequest<InfoResponse<Track>>(`me/top/tracks?limit=50&time_range=${timeRange}`);

    return data ? (
        <div className="mb-8">
            {data.items.map((item, index) => (
                <TrackInfo key={`track-${index}`} track={item} index={index} />
            ))}
        </div>
    ) : fetching ? (
        <Fetching color="text-purple-400" />
    ) : (
        <Error message={error!} />
    );
}
