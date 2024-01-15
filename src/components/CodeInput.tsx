import React, { useRef } from 'react';
import styled from 'styled-components';

const NumberInput = styled.input`
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    -moz-appearance: textfield;
    font-family: IBM Plex Mono;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    
    background-color: #232323;
    border: 2px solid white;
    color: #FFFFFF;
    padding: 12px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 10px;
    &:focus{
        outline: none;
        box-shadow: -3px 4px #FFFFFF;
        transform: translateY(-4px) !important;
        transition: all ease-in .05s;
    }
    &:not(:placeholder-shown) {
        box-shadow: -3px 4px #FFFFFF;
        transform: translateY(-4px) !important;
        transition: all ease-in .05s;
    }
`;

const InputForm = styled.form`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: -30px;

`;

const CodeInput: React.FC = () => {
    // refs for each input
    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);
    const input3 = useRef<HTMLInputElement>(null);
    const input4 = useRef<HTMLInputElement>(null);

    // Handles input event to limit to one character and focus next input
    const handleOnNumberInput = (nextInput: React.RefObject<HTMLInputElement>) => (e: React.FormEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
    
        if (value.length > 1) {
            inputElement.value = value.slice(0, 1);
        }

        if (value.length === 1 && nextInput.current) {
            nextInput.current.focus();
        }
    };

    // handles arrow key navigation
    const handleKeyDown = (prevInput?: React.RefObject<HTMLInputElement>, nextInput?: React.RefObject<HTMLInputElement>) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowRight' && nextInput?.current) {
            nextInput.current.focus();
        } else if (e.key === 'ArrowLeft' && prevInput?.current) {
            prevInput.current.focus();
        } else if (e.key === 'Backspace') {
            const inputElement = e.target as HTMLInputElement;
            if (inputElement.value === '' && prevInput?.current) {
                prevInput.current.focus();
            }
        }
    };

    // handles pasting of data into inputs
    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData('text').slice(0, 4); // Limiting to 4 characters

        const inputs = [input1, input2, input3, input4];

        pastedData.split('').forEach((char, index) => {
            const inputRef = inputs[index];
            if (inputRef && inputRef.current) {
                inputRef.current.value = char;
            }
        });

        const nextInputIndex = pastedData.length;
        const nextInput = inputs[nextInputIndex] ? inputs[nextInputIndex].current : null;
        if (nextInput) {
            nextInput.focus();
        }
    };

    return (
        <InputForm>
            <NumberInput type="number" min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input2)} ref={input1} onKeyDown={handleKeyDown(undefined, input2)} onPaste={handleOnPaste} autoFocus/>
            <NumberInput type="number" min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input3)} ref={input2} onKeyDown={handleKeyDown(input1, input3)} onPaste={handleOnPaste}/>
            <NumberInput type="number" min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input4)} ref={input3} onKeyDown={handleKeyDown(input2, input4)} onPaste={handleOnPaste}/>
            <NumberInput type="number" min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input4)} ref={input4} onKeyDown={handleKeyDown(input3, undefined)} onPaste={handleOnPaste}/>
        </InputForm>
    );
};

export default CodeInput;