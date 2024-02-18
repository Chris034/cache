import styled from 'styled-components';
import { Page, useSwitchPage } from '../hooks';
import { ActionButton, ButtonGroup, ChatInput } from '../components';
import ChatMessageView from '../components/ChatMessageView';
import { generateRoomCode } from '../utility/generateRoomCode';
import { useApplication } from '../components/providers/ApplicationContextProvider';
import { useQuery } from '@tanstack/react-query';
import { ChatMessageDto, FileDto } from '../api/API';
import { SOCKET_EVENTS } from '../api/socket/socketEvents';
import { socket } from '../socket/socket';
import { useEffect, useState } from 'react';
import { blobToArrayBuffer } from '../utility/fileTransfer';

const Wrapper = styled.div`
    padding: 40px 10px 38px 10px;
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
    @media (max-width: 400px) {
        font-size: 15vw;
        line-height: 6vh;
        padding-left: 0px;
    }
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
    margin-bottom: 2px;
    flex-shrink: 0;
`;

const ChatRoom = (): JSX.Element => {
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
        socket.on(SOCKET_EVENTS.MESSAGE, (data: ChatMessageDto) => {
            setMessages((prev: ChatMessageDto[]) => [...prev, data]);
        });
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

    const sendMessage = async (content: string, files: File[]) => {
        const buffers = await Promise.all(
            files.map(async (file) => {
                return await new Response(file).arrayBuffer();
            })
        );

        const fileDto: FileDto[] = files.map((file: File, idx: number) => {
            return {
                fileName: file.name,
                contentType: file.type,
                data: buffers[idx] as unknown as string
            };
        });

        // Send message to the server in a specific room
        socket.emit(SOCKET_EVENTS.MESSAGE, {
            room: chatRoomNumber,
            message: {
                username: username,
                createdOn: new Date(),
                content: encodeURIComponent(content),
                roomNumber: chatRoomNumber,
                files: fileDto
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
    console.log(messages);

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
                        feeling lucky
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
