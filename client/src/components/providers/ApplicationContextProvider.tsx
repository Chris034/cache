import { createContext, useContext, useState, useEffect } from 'react';
import { Api, HttpClient } from '../../api/API';
import { socket } from '../../socket/socket';
import { generateUserName } from '../../utility/usernameGeneration';

function getClientApi(): Api<unknown> {
    const client = new HttpClient({
        baseUrl:
            process.env.REACT_APP_ENV === 'production'
                ? process.env.REACT_APP_API_PROD_ENDPOINT
                : process.env.REACT_APP_API_DEV_ENDPOINT
    });
    return new Api(client);
}

export interface ApplicationContext {
    datasource: Api<unknown>;
    username: string;
}

export const ApplicationContextInitialState: ApplicationContext = {
    datasource: getClientApi(),
    username: generateUserName()
};

export const ApplicationContext = createContext<ApplicationContext>(
    ApplicationContextInitialState
);

export function useApplication() {
    return useContext(ApplicationContext);
}

export interface ApplicationContextProviderProps {
    children: JSX.Element[] | JSX.Element;
}

export const ApplicationContextProvider = (
    props: ApplicationContextProviderProps
) => {
    const [context, setContext] = useState<ApplicationContext>(
        ApplicationContextInitialState
    );
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setContext((context) => ({ ...context, username: savedUsername }));
        } else {
            localStorage.setItem('username', context.username);
        }

        socket.on('connect', () => {});

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <ApplicationContext.Provider value={context}>
            {props.children}
        </ApplicationContext.Provider>
    );
};
