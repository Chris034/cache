import { createContext, useContext, useState } from "react";
import { Api, HttpClient } from "../../api/API";

function getClientApi(): Api<unknown> {
    const client = new HttpClient({
        baseUrl: 'http://localhost:5000'
    })
    return new Api(client);
}

export interface ApplicationContext {
    datasource: Api<unknown>
}

export const ApplicationContextInitialState: ApplicationContext = {
    datasource: getClientApi()
}

export const ApplicationContext = createContext<ApplicationContext>(ApplicationContextInitialState);

export function useApplication()  {
    return useContext(ApplicationContext);
} 

export interface ApplicationContextProviderProps {
    children: JSX.Element[] | JSX.Element
}

export const ApplicationContextProvider = (props: ApplicationContextProviderProps) => {

    const [context, setContext] = useState<ApplicationContext>(ApplicationContextInitialState);
    
    return (
        <ApplicationContext.Provider value={context}>
                {props.children}
        </ApplicationContext.Provider>
    )
}