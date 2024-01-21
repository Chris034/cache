import styled from 'styled-components';
import { Page, useSwitchPage } from '../hooks';
import { ActionButton, ButtonGroup } from './Home';
import { ChatInput } from '../components';
import ChatMessageView from '../components/ChatMessageView';
import { generateRoomCode } from '../commonLogic/generateRoomCode';

export const Wrapper = styled.div`
    padding: 20px 40px 40px 40px;
    // border: 1px solid green;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
`;

export const Header = styled.div`
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 0px 10px;
    // border: 1px solid red;
`;

export const ChatRoomTitle = styled.div`
    font-family: IBM Plex Mono;
    font-size: 72px;
    font-weight: 700;
    line-height: 94px;
    letter-spacing: -0.07em;
    text-align: left;
    padding-left: 10px;
`;

export const ChatBoxContainer = styled.div`
    display: flex;
    flex-flow: column;
    // border: 1px solid purple;
    height: 100%;
    max-height; inherit;
`;

export const ChatBoxViewContainer = styled.div`
    // border: 1px solid yellow;
    padding: 10px 10px 10px 10px;
    flex: 1 1 auto;
`;

export const ChatBoxInputContainer = styled.div`
    flex: 0 1 80px;
`;

const ChatRoom = (): React.JSX.Element => {
    const {
        navigateTo,
        params: { chatRoomId }
    } = useSwitchPage();

    function handleCreateRoomClick() {
        navigateTo(Page.ChatRoomPage, generateRoomCode());
    }
    function handleJoinRoomClick() {
        navigateTo(Page.JoinRoomPage);
    }
    return (
        <Wrapper>
            <Header>
                <ChatRoomTitle>room {chatRoomId}</ChatRoomTitle>
                <ButtonGroup
                    position="relative"
                    gap="50px"
                    style={{ maxWidth: '30vw' }}
                >
                    <ActionButton onClick={handleCreateRoomClick}>
                        make a room
                    </ActionButton>
                    <ActionButton onClick={handleJoinRoomClick}>
                        join a room
                    </ActionButton>
                </ButtonGroup>
            </Header>
            <ChatBoxContainer>
                <ChatBoxViewContainer>
                    <ChatMessageView />
                </ChatBoxViewContainer>
                <ChatBoxInputContainer>
                    <ChatInput />
                </ChatBoxInputContainer>
            </ChatBoxContainer>
        </Wrapper>
    );
};

export default ChatRoom;
