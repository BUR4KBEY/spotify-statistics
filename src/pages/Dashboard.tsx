import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import DashboardContent from '../components/DashboardContent';
import Error from '../components/Error';
import Fetching from '../components/Fetching';
import { AuthContext } from '../context/AuthContext';
import { Profile } from '../utils/interfaces';
import useRequest from '../utils/useRequest';

export default function DashboardPage() {
    const { token, dispatch } = useContext(AuthContext);
    const { data, fetching, error } = useRequest<Profile>('me');

    if (error === 'Invalid access token') dispatch({ type: 'CLEAR' });

    return token ? data ? <DashboardContent profile={data} /> : fetching ? <Fetching color="text-purple-600" /> : <Error message={error!} /> : <Redirect to="/" />;
}
