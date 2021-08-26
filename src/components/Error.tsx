import { ExclamationCircleIcon } from '@heroicons/react/solid';

interface Props {
    message: string;
}

export default function Error({ message }: Props) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
            <div className="flex items-center gap-4 text-red-500">
                <ExclamationCircleIcon className="w-12 h-12" />
                <h1 className="font-bold text-3xl md:text-4xl">An error occurred</h1>
            </div>
            <p className="text-gray-300 font-thin text-xl break-all mx-6">{message}</p>
        </div>
    );
}
