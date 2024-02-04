import styled from 'styled-components';
import { Page, useSwitchPage } from '../hooks';
import { ActionButton, ButtonGroup, ChatInput } from '../components';
import ChatMessageView from '../components/ChatMessageView';
import { generateRoomCode } from '../utility/generateRoomCode';
import { useApplication } from '../components/providers/ApplicationContextProvider';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { ChatMessageDto } from '../api/API';
import { SOCKET_EVENTS } from '../api/socket/socketEvents';
import { socket } from '../socket/socket';

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
    overflow: hidden;
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
        params: { chatRoomNumber }
    } = useSwitchPage();

    const { datasource, username } = useApplication();

    const [messages, setMessages] = useState<ChatMessageDto[]>([]);

    const {
        isLoading,
        error,
        data: chatRoomMessages,
        refetch: refetchChatRoomMessages
    } = useQuery({
        queryKey: ['getChatRoomMessagesByRoomNumber'],
        queryFn: async () => {
            const response = await datasource.api.chatMessageGetAllByRoomNumber(
                chatRoomNumber!
            );
            setMessages(response.data);
            return response.data;
        }
    });

    const joinRoom = (room: string) => {
        // Join the specified room
        socket.emit(SOCKET_EVENTS.JOIN_ROOM, room);
    };

    useEffect(() => {
        // listen whenever a message comes in append to messages
        socket.on(SOCKET_EVENTS.MESSAGE, (data: ChatMessageDto) =>
            setMessages((prev) => [...prev, data])
        );
    }, []);

    useEffect(() => {
        // whenver a the room number changes, verify its a valid room number
        if (chatRoomNumber?.length != 4) {
            navigateTo(Page.DeadEndPage);
        }

        // and update the socket and fetch all existing messages
        joinRoom(chatRoomNumber!);
        refetchChatRoomMessages();
    }, [chatRoomNumber]);

    const sendMessage = (content: string) => {
        // Send message to the server in a specific room
        socket.emit(SOCKET_EVENTS.MESSAGE, {
            room: chatRoomNumber,
            message: {
                username: username,
                createdOn: new Date(),
                content: encodeURIComponent(content),
                roomNumber: chatRoomNumber
            }
        });
    };
    function handleCreateRoomClick() {
        navigateTo(Page.ChatRoomPage, generateRoomCode());
    }
    function handleJoinRoomClick() {
        navigateTo(Page.JoinRoomPage);
    }

    if (isLoading) return <>Loading...</>;

    if (error) return <>An error has occurred: + {error.message}</>;

    return (
        <Wrapper>
            <Header>
                <ChatRoomTitle>room {chatRoomNumber}</ChatRoomTitle>
                <ButtonGroup
                    $position="relative"
                    $gap="50px"
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
                    <ChatMessageView chatRoomMessages={messages} />
                </ChatBoxViewContainer>
                <ChatBoxInputContainer>
                    <ChatInput onSubmit={sendMessage} />
                </ChatBoxInputContainer>
            </ChatBoxContainer>
        </Wrapper>
    );
};

export default ChatRoom;
