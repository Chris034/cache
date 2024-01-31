import styled from 'styled-components';
import { Page, useSwitchPage } from '../hooks';
import { ActionButton, ButtonGroup, ChatInput } from '../components';
import ChatMessageView from '../components/ChatMessageView';
import { generateRoomCode } from '../commonLogic/generateRoomCode';

const Wrapper = styled.div`
    padding: 40px 10px 40px 10px;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
`;

const Header = styled.div`
    box-sizing: border-box;
    color: #ffffff;
    background-color: inherit;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px 0px 20px;
`;

const ChatRoomTitle = styled.div`
    font-family: IBM Plex Mono;
    font-size: 72px;
    font-weight: 700;
    line-height: 94px;
    letter-spacing: -0.07em;
    text-align: left;
    padding-left: 10px;
`;

const ChatBoxContainer = styled.div`
    display: flex;
    flex-flow: column;
    flex-grow: 1;
    box-sizing: border-box;
    max-height: 83vh;
    overflow: hidden
`;

const ChatBoxViewContainer = styled.div`
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
    overflow-y: auto;
    flex: 1;
`;

const ChatBoxInputContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 50px;
    margin-top: 15px;
    flex-shrink: 0;
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
