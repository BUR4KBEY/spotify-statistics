import { createContext, FC, useReducer } from 'react';
import Cookies from 'universal-cookie';

import { AuthAction, AuthContextState } from '../utils/interfaces';

const cookies = new Cookies();
const tokenCookie = cookies.get('token');

const defaultContextState = { token: tokenCookie ? tokenCookie : null } as AuthContextState;

export const AuthContext = createContext<AuthContextState>(defaultContextState);

function AuthReducer(state: AuthContextState, action: AuthAction): AuthContextState {
    switch (action.type) {
        case 'SET':
            const token = `${action.payload!.token_type} ${action.payload!.access_token}`;
            cookies.set('token', token, { path: '/', maxAge: Number(action.payload!.expires_in) });
            return { token } as AuthContextState;
        case 'CLEAR':
            cookies.remove('token');
            return { token: null } as AuthContextState;
        default:
            return state;
    }
}

export const AuthContextProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, defaultContextState);

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
