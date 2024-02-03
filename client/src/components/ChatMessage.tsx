import styled from 'styled-components';
import { ChatMessageDto } from '../api/API';

const Message = styled.div`
    padding: 25px;
    width: 95%;
    background: #inherit;
    color: white;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #484848;
    transition: all ease-in 0.1s;
    &:hover{
        background-color: #1a1a1a
    }
`;

const MessageHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    
    align-items: center;
`;

const MessageOwnerName = styled.div`
    font-family: IBM Plex Sans;
    font-size: 18px;
    color: pink;
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

const ChatMessage = (props: ChatMessageProps) => {
    const { username, content: messageContent, createdOn } = props.message;
    const date = new Date(createdOn!)
    const day = date.toLocaleDateString('en-US')
    const time = date.toLocaleTimeString('en-US')
    return (
        <Message>
            <MessageHeader>
                <MessageOwnerName>{username}</MessageOwnerName>
                <MessageCreatedOn>{day + ' ' + time}</MessageCreatedOn>
            </MessageHeader>
            <MessageContent>{messageContent}</MessageContent>
        </Message>
    );
};

export default ChatMessage;
