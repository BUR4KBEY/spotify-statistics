import { useHistory } from 'react-router-dom';

import { EmojiSadIcon, HomeIcon } from '@heroicons/react/solid';

import Button from '../components/Button/Button';

export default function PageNotFoundPage() {
    const history = useHistory();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
            <div className="flex items-center gap-4 text-gray-200">
                <EmojiSadIcon className="w-12 h-12" />
                <h1 className="font-bold text-4xl">Page not found</h1>
            </div>
            <Button className="text-white bg-purple-600 hover:bg-purple-400" child={<HomeIcon className="h-5 w-5 mr-3" />} text="Back  Home" onClick={() => history.push('/')} />
        </div>
    );
}
