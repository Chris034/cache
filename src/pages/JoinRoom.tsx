import styled from 'styled-components';
import {
    ActionButton,
    ButtonGroup,
    Description,
    Title,
    TitleContainer
} from './Home';
import CodeInput from '../components/CodeInput';
import { useState } from 'react';
import { Page, useSwitchPage } from '../hooks';

const JoinRoomDescription = styled(Description)`
    margin-top: 60px;
    text-align: center;
`;

const JoinRoom = (): React.JSX.Element => {
    const navigateTo = useSwitchPage();

    const [roomCode, setRoomCode] = useState<string>('');

    const handleJoinClick = () => {
        if (roomCode?.trim().length == 4) {
            navigateTo(Page.ChatRoomPage, roomCode);
        }
    };

    return (
        <TitleContainer>
            <Title>join a room</Title>
            <JoinRoomDescription>
                Enter the 4-digit code below to join the room.
            </JoinRoomDescription>
            <CodeInput onCodeChange={setRoomCode} />
            <ButtonGroup>
                <ActionButton onClick={handleJoinClick}>join</ActionButton>
            </ButtonGroup>
        </TitleContainer>
    );
};

export default JoinRoom;
