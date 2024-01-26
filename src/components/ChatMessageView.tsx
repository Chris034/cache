import styled from 'styled-components';
import ChatMessage, { Message } from './ChatMessage';
import { useEffect, useRef, useState } from 'react';

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
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Ac tortor dignissim convallis aenean et tortor at risus viverra. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Sed augue lacus viverra vitae congue eu. Quisque sagittis purus sit amet. Eget mauris pharetra et ultrices neque ornare aenean. Viverra aliquet eget sit amet tellus cras. Gravida dictum fusce ut placerat orci nulla pellentesque. Pretium nibh ipsum consequat nisl vel. Metus dictum at tempor commodo ullamcorper. Mi proin sed libero enim sed faucibus turpis in. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Massa ultricies mi quis hendrerit."
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Non nisi est sit amet."
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "🔥🔥🔥"
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
                "Egestas purus viverra accumsan in nisl. Egestas maecenas pharetra convallis posuere. Maecenas volutpat blandit aliquam etiam. Senectus et netus et malesuada. In arcu cursus euismod quis viverra. Tincidunt lobortis feugiat vivamus at augue eget. Sed id semper risus in hendrerit gravida. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Donec ac odio tempor orci dapibus. "
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Quam pellentesque nec nam aliquam sem et tortor consequat. Tincidunt arcu non sodales neque sodales ut etiam sit. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Dignissim enim sit amet venenatis."
        },
        {
            name: 'Braveheart38',
            createdOn: new Date(),
            messageContent:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
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
