import SpinnerSVG from '../svg/spinner';

interface Props {
    color: string;
}

export default function Fetching({ color }: Props) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <SpinnerSVG color={color} width="w-16" height="h-16" />
        </div>
    );
}
