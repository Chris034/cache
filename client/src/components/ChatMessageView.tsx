import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { ChatMessageDto } from '../api/API';
import { message } from 'antd';

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
    white-space: pre;

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #484848;
        border-radius: 10px;
        background-clip: padding-box;
        border: 3px solid transparent;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #666666;
        border: 0;
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

    useLayoutEffect(() => {
        // move scrollbar to bottom on update
        const element = refView?.current!;
        if (element) {
            element.lastElementChild?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });
        }
    }, [props.chatRoomMessages]);

    useEffect(() => {
        const element = refView?.current!;
        if (element) {
            // timeout because issue with scrollbar stopping 95% of the way at the bottom
            setTimeout(() => {
                element.lastElementChild?.scrollIntoView({
                    behavior: 'instant',
                    block: 'end',
                    inline: 'nearest'
                });
            }, 5);
        }
    }, []);
    return (
        <MessageViewWrapper>
            <MessageView ref={refView}>
                <MessageContainer>
                    {props.chatRoomMessages.map(
                        (message: ChatMessageDto, index) => {
                            return (
                                <div key={index.toString()}>
                                    <ChatMessage message={message} />
                                </div>
                            );
                        }
                    )}
                </MessageContainer>
            </MessageView>
        </MessageViewWrapper>
    );
};

export default ChatMessageView;
