import { useContext } from 'react';
import env from 'react-dotenv';
import { Redirect } from 'react-router-dom';

import { LoginIcon } from '@heroicons/react/outline';

import GithubPNG from '../assets/github.png';
import SpotifySVG from '../assets/spotify.svg';
import Button from '../components/Button/Button';
import { AuthContext } from '../context/AuthContext';
import { getAuthURL } from '../utils/functions';

export default function IndexPage() {
    const { token } = useContext(AuthContext);

    return !token ? (
        <div className="w-full h-full flex flex-col gap-8 items-center justify-center text-white">
            <div className="flex gap-1 items-center">
                <img alt="Spotify" src={SpotifySVG} className="w-12 h-12 md:w-32 md:h-32" />
                <h1 className="font-bold text-3xl md:text-5xl uppercase ">Spotify Statistics</h1>
            </div>
            <Button
                className="text-white bg-green-600 hover:bg-green-400"
                text="Log In With Spotify"
                child={<LoginIcon className="h-5 w-5 mr-3" />}
                onClick={() => (window.location.href = getAuthURL(env.CLIENT_ID, env.REDIRECT_URI, JSON.parse(env.SCOPES)))}
            />
            <img alt="Github" src={GithubPNG} className="w-8 h-8 cursor-pointer" onClick={() => window.open('https://github.com/bur4kbey/spotify-statistics', '_blank')} />
        </div>
    ) : (
        <Redirect to="/dashboard" />
    );
}
