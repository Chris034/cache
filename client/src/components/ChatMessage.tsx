import styled from 'styled-components';
import { ChatMessageDto } from '../api/API';
import { generateColorByUser } from '../utility/usernameGeneration';
import Linkify from 'react-linkify';
import React from 'react';
import { FileDisplay } from './FileDisplay';

const Message = styled.div`
    padding: 25px;
    width: 95%;
    background: #inherit;
    color: white;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #484848;
    transition: all ease-in 0.1s;
    white-space: pre-line;
    word-wrap: break-word;
    &:hover {
        background-color: #1a1a1a;
    }
`;

const MessageHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;

    align-items: center;
`;

const MessageUserName = styled.div<{
    $color: string;
}>`
    font-family: IBM Plex Sans;
    font-size: 18px;
    color: ${(props) => props.$color};
    font-weight: 900;
`;
const MessageCreatedOn = styled.div`
    font-family: IBM Plex Sans;
    font-size: 10px;
    color: grey;
`;

const MessageContent = styled.div`
    font-family: IBM Plex Sans;
    font-size: 16px;
`;

interface ChatMessageProps {
    message: ChatMessageDto;
}

function componentDecorator(
    decoratedHref: string,
    decoratedText: string,
    key: number
): React.ReactNode {
    return (
        <a target="_blank" href={decoratedHref} key={key}>
            {decoratedText}
        </a>
    );
}

const ChatMessage = (props: ChatMessageProps) => {
    const {
        username,
        content: messageContent,
        createdOn,
        files
    } = props.message;
    const date = new Date(createdOn!);
    const day = date.toLocaleDateString('en-US');
    const time = date.toLocaleTimeString('en-US');
    const color = generateColorByUser(username);

    return (
        <Message>
            <MessageHeader>
                <MessageUserName $color={color}>{username}</MessageUserName>
                <MessageCreatedOn>{day + ' ' + time}</MessageCreatedOn>
                <FileDisplay
                    fileDisplayRef={undefined}
                    files={files || []}
                    canDownload={true}
                />
            </MessageHeader>
            <MessageContent>
                <Linkify componentDecorator={componentDecorator}>
                    {decodeURIComponent(messageContent)}
                </Linkify>
            </MessageContent>
        </Message>
    );
};

export default ChatMessage;
