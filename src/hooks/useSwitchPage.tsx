import { useNavigate } from 'react-router-dom';

export const enum Page {
    HomePage = '/',
    JoinRoomPage = '/join-room',
    ChatRoomPage = '/chatroom',
    DeadEndPage = '/dead-end'
}

export function useSwitchPage() {
    const navigate = useNavigate();

    const navigateTo = (page: Page, parameter?: string) => {
        navigate(page + `/${parameter || ''}`);
    };

    return navigateTo;
}
