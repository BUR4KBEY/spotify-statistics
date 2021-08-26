import { useContext, useState } from 'react';

import { LogoutIcon } from '@heroicons/react/outline';

import { AuthContext } from '../context/AuthContext';
import { Profile } from '../utils/interfaces';
import Button from './Button/Button';
import CustomRadioButton from './Button/CustomRadioButton';
import GetArtist from './Get/GetArtist';
import GetTrack from './Get/GetTrack';

interface Props {
    profile: Profile;
}

export default function DashboardContent({ profile }: Props) {
    const { dispatch } = useContext(AuthContext);

    const [type, setType] = useState('tracks');
    const [timeRange, setTimeRange] = useState('short_term');

    const logOut = () => dispatch({ type: 'CLEAR' });

    return (
        <div className="w-full h-full text-white flex flex-col items-center gap-8">
            <div className="w-full flex flex-col self-start items-center gap-8 mt-8">
                <div className="flex gap-8 items-center">
                    {profile.images.length ? <img alt="Profile" className="rounded-full w-32 h-32" src={profile.images[0].url} /> : ''}
                    <div className="flex flex-col gap-2">
                        <strong className="font-bold text-3xl text-purple-200">Welcome</strong>
                        <h1 className="font-thin text-2xl">{profile.display_name}</h1>
                    </div>
                </div>
                <Button className="text-white bg-red-600 hover:bg-red-400" child={<LogoutIcon className="h-5 w-5 mr-3" />} text="Log Out" onClick={logOut} />
            </div>
            <div className="flex gap-4">
                <CustomRadioButton state={type} setState={setType} value="tracks" label="Tracks" />
                <CustomRadioButton state={type} setState={setType} value="artists" label="Artists" />
            </div>
            <div className="flex gap-4">
                <CustomRadioButton state={timeRange} setState={setTimeRange} value="short_term" label="Last 4 Week" />
                <CustomRadioButton state={timeRange} setState={setTimeRange} value="medium_term" label="Last 6 Months" />
                <CustomRadioButton state={timeRange} setState={setTimeRange} value="long_term" label="All Time" />
            </div>
            {type === 'tracks' ? <GetTrack timeRange={timeRange} /> : <GetArtist timeRange={timeRange} />}
        </div>
    );
}
