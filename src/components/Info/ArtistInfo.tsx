import { Artist } from '../../utils/interfaces';

interface Props {
    artist: Artist;
    index: number;
}

export default function ArtistInfo({ artist, index }: Props) {
    return (
        <div className="w-full flex items-center gap-6 mb-8 cursor-pointer" onClick={() => window.open(artist.external_urls.spotify, '_blank')}>
            <strong className="font-bold text-2xl text-purple-300">{index + 1}</strong>
            <img alt="Artist" width="48" height="48" src={artist.images[0].url} />
            <strong className="font-bold text-xl text-purple-100">{artist.name}</strong>
        </div>
    );
}
