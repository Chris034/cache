import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatRoom, DeadEnd, Home, JoinRoom, Layout } from './pages';
import QueryClientProvider from './components/providers/QueryClientProvider';
import { ApplicationContextProvider } from './components/providers/ApplicationContextProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // <React.StrictMode>
        <QueryClientProvider>
            <ApplicationContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="join-room" element={<JoinRoom />} />
                            <Route
                                path="chat-room/:chatRoomNumber"
                                element={<ChatRoom />}
                            />
                            <Route path="*" element={<DeadEnd />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ApplicationContextProvider>
        </QueryClientProvider>
    // </React.StrictMode>
);
