import { Artist, InfoResponse } from '../../utils/interfaces';
import useRequest from '../../utils/useRequest';
import Error from '../Error';
import Fetching from '../Fetching';
import ArtistInfo from '../Info/ArtistInfo';

interface Props {
    timeRange: string;
}

export default function GetArtist({ timeRange }: Props) {
    const { data, fetching, error } = useRequest<InfoResponse<Artist>>(`me/top/artists?limit=50&time_range=${timeRange}`);

    return data ? (
        <div className="mb-8">
            {data.items.map((item, index) => (
                <ArtistInfo key={`artist-${index}`} artist={item} index={index} />
            ))}
        </div>
    ) : fetching ? (
        <Fetching color="text-purple-400" />
    ) : (
        <Error message={error!} />
    );
}
