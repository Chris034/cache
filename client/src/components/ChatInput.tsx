import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChatMessageDto } from '../api/API';

const InputBox = styled.textarea`
    justify-content: center;
    width: 97%;
    font-family: IBM Plex Sans;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #1a1a1a;
    height: 50px;
    color: #ffffff;
    border: none;
    display: block;
    resize: none;
    outline: none;
    overflow-y: auto;
    border-radius: 20px;
    padding: 15px;
    margin: auto;

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

interface ChatInputProps {
    onSubmit: (content: string) => void
}

const ChatInput = (props: ChatInputProps) => {
    const inputBoxRef = useRef<HTMLTextAreaElement>(null);

    const [chatInput, setChatInput] = useState<string>('');

    function autoResize(ref: React.RefObject<HTMLTextAreaElement>) {
        let element: HTMLTextAreaElement | null = ref?.current;
        if (
            element &&
            element.scrollHeight >= 50 &&
            element.scrollHeight <= 350 &&
            element.parentElement
        ) {
            element.style.height = '1px';
            element.parentElement.style.height = element.scrollHeight + 'px';
            element.style.height = element.scrollHeight + 'px';
        }
    }

    function handleOnKeyDown(e?: React.KeyboardEvent<HTMLTextAreaElement>) {
        if(e == undefined) { return; }
        if(e.key === 'Enter' && e.shiftKey) {
        } else if (e.key === 'Enter') {
            props.onSubmit(chatInput);
            setChatInput('')
            if (inputBoxRef?.current?.parentElement &&  inputBoxRef?.current) {
                inputBoxRef.current.parentElement.style.height = '50px'
                inputBoxRef.current.style.height = '50px'
            }
            e.preventDefault()
        }
    }

    useEffect(() => {
        inputBoxRef?.current?.addEventListener('input', () =>
            autoResize(inputBoxRef)
        );
        return () => {
            inputBoxRef?.current?.removeEventListener('input', () =>
                autoResize(inputBoxRef)
            );
        };
    }, []);

    return (
        <InputBox value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={handleOnKeyDown} placeholder="Enter message..." ref={inputBoxRef}></InputBox>
    );
};

export default ChatInput;
