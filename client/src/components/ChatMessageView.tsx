import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageDto } from '../api/API';
const MessageViewWrapper = styled.div`
    background: #232323;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
`;

const MessageView = styled.div`
    background: #inherit;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: #transparent;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #343434;
        border-radius: 10px;
        background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #666666;
        
    }
`;

const MessageContainer = styled.div`
    width: 100%;
`;

interface ChatMessageViewProps {
    chatRoomMessages: ChatMessageDto[];
}

const ChatMessageView = (props: ChatMessageViewProps) => {
    const refView = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refView?.current) {
            refView.current.scrollTop = refView.current.scrollHeight;
        }
    }, []);

     const [messages, setMessages] = useState<ChatMessageDto[]>(props.chatRoomMessages)

    return (
        <MessageViewWrapper>
            <MessageView ref={refView}>
                <MessageContainer>
                    {messages.map((message: ChatMessageDto, index) => {
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
