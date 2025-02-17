import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const baseUrl = process.env.REACT_APP_API_PROXY;

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        console.log(`Base URL: ${baseUrl}`); // Log the base URL
        console.log(`Login request with email: ${email}, password: ${password}`); // Log request data
        
        const response = await fetch(`${baseUrl}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json();

        console.log('Response:', json); // Log the response

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return;
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
