import React, { useEffect, useRef, useState } from 'react';
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

type CodeInputProps = {
    setCode: React.Dispatch<React.SetStateAction<number | null>>
    submitted: boolean
  };

function test (ref1:any, ref2:any, ref3:any, ref4:any){
    console.log(ref1.current.value)
} 


const CodeInput = (props: CodeInputProps) => {
    // refs for each input
    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);
    const input3 = useRef<HTMLInputElement>(null);
    const input4 = useRef<HTMLInputElement>(null);

    const [char1, setChar1] = useState<number | undefined>();
    const [char2, setChar2] = useState<number | undefined>();
    const [char3, setChar3] = useState<number | undefined>();
    const [char4, setChar4] = useState<number | undefined>();

    useEffect(() => {
        if (char1 && char2 && char3 && char4) {
            const code: string = "" + char1 + char2 + char3 + char4
            props.setCode(parseInt(code))
        }
    },[props.submitted])

    // handles input event to limit to one character and focus next input
    const handleOnNumberInput = (nextInput: React.RefObject<HTMLInputElement>, setCurrentCharState: React.Dispatch<React.SetStateAction<number | undefined>>) => (e: React.FormEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        if (value.length >= 1) {
            setCurrentCharState(parseInt(value.slice(0, 1)));
        }

        if (value.length === 1 && nextInput.current) {
            nextInput.current.focus();
        }        
    };
    const handleKeyDown = (prevInput?: React.RefObject<HTMLInputElement>, currentRef?: React.RefObject<HTMLInputElement>, setCurrVal?:  React.Dispatch<React.SetStateAction<number | undefined>>, nextInput?: React.RefObject<HTMLInputElement>) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowRight') {
            nextInput?.current?.focus();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            prevInput?.current?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
        } else if (e.key === 'Delete' && setCurrVal) {
            setCurrVal(() => undefined);
            e.preventDefault();
        } else if (e.key === 'Backspace') {
            if (setCurrVal) {
                if (currentRef?.current?.value) {
                    setCurrVal(() => undefined);
                    return
                } else {
                    prevInput?.current?.focus();
                }
            }
        }
    };

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData('text').slice(0, 4);

        const inputs = [input1, input2, input3, input4];

        pastedData.split('').forEach((char, index) => {
            const inputRef = inputs[index];
            if (inputRef && inputRef.current) {
                inputRef.current.value = char;
                inputRef.current.focus();
            }
        });
    };

    return (
        <InputForm>
            <NumberInput type="number" value={char1} min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input2, setChar1)} ref={input1} onKeyDown={handleKeyDown(undefined, input1, setChar1, input2)} onPaste={handleOnPaste} autoFocus/>
            <NumberInput type="number" value={char2} min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input3, setChar2)} ref={input2} onKeyDown={handleKeyDown(input1, input2, setChar2, input3)} onPaste={handleOnPaste}/>
            <NumberInput type="number" value={char3} min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input4, setChar3)} ref={input3} onKeyDown={handleKeyDown(input2,  input3, setChar3, input4)} onPaste={handleOnPaste}/>
            <NumberInput type="number" value={char4} min="0" max="9" placeholder=" " onInput={handleOnNumberInput(input4, setChar4)} ref={input4} onKeyDown={handleKeyDown(input3, input4, setChar4, undefined)} onPaste={handleOnPaste}/>
        </InputForm>
    );
};

export default CodeInput;