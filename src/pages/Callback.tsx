import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { getHash } from '../utils/functions';
import { AuthSuccessResponse } from '../utils/interfaces';

export default function CallbackPage() {
    const { dispatch } = useContext(AuthContext);
    const hash = getHash<AuthSuccessResponse>();

    if (hash.access_token) dispatch({ type: 'SET', payload: hash });

    return <Redirect to="/dashboard" />;
}
