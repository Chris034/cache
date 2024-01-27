import styled from 'styled-components';
import ChatMessage, { Message } from './ChatMessage';
import { useEffect, useRef, useState } from 'react';

const MessageViewWrapper = styled.div`
    background: #363636;
    border-radius: 30px;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
`;

const MessageView = styled.div`
    background: #363636;
    height: 100%;
    max-height: 70vh;
    box-sizing: border-box;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 20px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #8c9295;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
`;

const MessageContainer = styled.div`
    width: 100%;
`;

const ChatMessageView = () => {
    const refView = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refView?.current) {
            refView.current.scrollTop = refView.current.scrollHeight;
        }
    }, []);

    const [messages, setMessages] = useState<Message[]>([
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        "
        }
    ]);

    return (
        <MessageViewWrapper>
            <MessageView ref={refView}>
                <MessageContainer>
                    {messages.map((message: Message, index) => {
                        return (
                            <div key={index.toString()}>
                                <ChatMessage message={message} />
                            </div>
                        );
                    })}
                </MessageContainer>
            </MessageView>
        </MessageViewWrapper>
    );
};

export default ChatMessageView;
