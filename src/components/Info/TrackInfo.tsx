import { Track } from '../../utils/interfaces';

interface Props {
    track: Track;
    index: number;
}

export default function TrackInfo({ track, index }: Props) {
    return (
        <div className="w-full flex  items-center gap-6 px-4 mb-8 cursor-pointer" onClick={() => window.open(track.external_urls.spotify, '_blank')}>
            <strong className="font-bold text-2xl text-purple-300">{index + 1}</strong>
            <img alt="Track" width="48" height="48" src={track.album.images[0].url} />
            <strong className="font-bold text-xl text-purple-100">{track.name}</strong>
            <strong className="font-thin text-xl text-purple-400">{track.artists[0].name}</strong>
        </div>
    );
}
