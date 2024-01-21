import { useNavigate, useParams } from 'react-router-dom';

export const enum Page {
    HomePage = '/',
    JoinRoomPage = '/join-room',
    ChatRoomPage = '/chat-room',
    DeadEndPage = '/dead-end'
}

export function useSwitchPage() {
    const navigate = useNavigate();

    let params = useParams();

    const navigateTo = (page: Page, parameter?: string) => {
        navigate(page + `/${parameter || ''}`);
    };

    return { navigateTo, params };
}
