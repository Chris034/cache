import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatRoom, DeadEnd, Home, JoinRoom, Layout } from './pages';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="join-room" element={<JoinRoom />} />
                    <Route
                        path="chat-room/:chatRoomId"
                        element={<ChatRoom />}
                    />
                    <Route path="*" element={<DeadEnd />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
