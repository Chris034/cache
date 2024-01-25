import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const InputBar = styled.div`
    // width: 100%;
    // box-sizing: border-box;
    // background: none;
    // box-shadow: -2px 3px #ffffff;
    // border: 2px solid white;
    // &:hover {
    //     box-shadow: none;
    //     transform: translateY(4px) !important;
    //     transition: all ease-in 0.05s;
    // }
    // &:focus-within {
    //     box-shadow: none;
    //     transform: translateY(4px) !important;
    //     transition: all ease-in 0.05s;
    // }

    // margin: 20px;

    // height: 100px;
`;

const InputBox = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    background: none;
    color: #ffffff;
    border: none;
    display: block;
    resize: none;
    outline: none;
    min-height: 40px;
    overflow-y: 'auto';
    border: 1px solid red;
    border: 2px solid white;
    position: absolute;
    bottom: 0;
`;

const ChatInput = () => {
    const inputBoxRef = useRef<HTMLTextAreaElement>(null);

    function autoResize(ref: React.RefObject<HTMLTextAreaElement>) {
        let element: HTMLTextAreaElement | null = ref?.current;
        if (
            element &&
            element.scrollHeight >= 30 &&
            element.scrollHeight <= 350 &&
            element.parentElement
        ) {
            element.style.height = '1px';
            element.parentElement.style.height = element.scrollHeight + 'px';
            element.style.height = element.scrollHeight + 'px';
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
        // <InputBar>
        <InputBox ref={inputBoxRef}></InputBox>
        // </InputBar>
    );
};

export default ChatInput;
