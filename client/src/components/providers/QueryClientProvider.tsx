import { QueryClient, QueryClientProvider as QueryClientWapper } from "@tanstack/react-query"

const queryClient = new QueryClient()

export interface QueryClientProviderProps {
    children: JSX.Element[] | JSX.Element
}

export default function QueryClientProvider(props: QueryClientProviderProps) {
    
    return (
        <QueryClientWapper client={queryClient}>
            {props.children}
        </QueryClientWapper>
    )
}