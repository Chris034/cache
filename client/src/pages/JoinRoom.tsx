import styled from 'styled-components';
import CodeInput from '../components/CodeInput';
import { useState } from 'react';
import { Page, useSwitchPage } from '../hooks';
import {
    Description,
    TitleContainer,
    Title,
    ButtonGroup,
    ActionButton
} from '../components';

const JoinRoomDescription = styled(Description)`
    margin-top: 60px;
    text-align: center;
`;

const JoinRoom = (): React.JSX.Element => {
    const { navigateTo } = useSwitchPage();

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
            <CodeInput
                onCodeChange={setRoomCode}
                onSubmit={() => handleJoinClick()}
            />
            <ButtonGroup $marginTop="75px" $gap="210px">
                <ActionButton onClick={handleJoinClick}>join</ActionButton>
            </ButtonGroup>
        </TitleContainer>
    );
};

export default JoinRoom;
