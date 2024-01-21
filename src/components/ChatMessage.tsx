import styled from 'styled-components';

export const Message = styled.div`
    max-width: 100%;
    min-height: 100px;
    background: #363636;
    color: white;
    // border: 1px solid red;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
`;

export const MessageHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

export const MessageOwnerName = styled.div`
    font-family: IBM Plex Sans;
    font-size: 18px;
    font-weight: 900;
`;
export const MessageCreatedOn = styled.div`
    font-family: IBM Plex Sans;
    font-size: 10px;
`;

export const MessageContent = styled.div`
    font-family: IBM Plex Sans;
    font-size: 16px;
`;

export interface Message {
    name: string;
    messageContent: string;
    createdOn: Date;
}

interface ChatMessageProps {
    message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
    const { name, messageContent, createdOn } = props.message;
    return (
        <Message>
            <MessageHeader>
                <MessageOwnerName>{name}</MessageOwnerName>
                <MessageCreatedOn>{'2024-01-21 6:01AM'}</MessageCreatedOn>
            </MessageHeader>
            <MessageContent>{messageContent}</MessageContent>
        </Message>
    );
};

export default ChatMessage;
