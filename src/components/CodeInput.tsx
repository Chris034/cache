
import React, { useEffect, useRef, useState, KeyboardEvent, ChangeEvent, ClipboardEvent  } from "react";
import styled from "styled-components";

const NumberInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -moz-appearance: textfield;
  font-family: IBM Plex Mono;
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;

  background-color: #232323;
  border: 2px solid white;
  color: #ffffff;
  padding: 12px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 10px;
  &:focus {
    outline: none;
    box-shadow: -3px 4px #ffffff;
    transform: translateY(-4px) !important;
    transition: all ease-in 0.05s;
  }
  &:not(:placeholder-shown) {
    box-shadow: -3px 4px #ffffff;
    transform: translateY(-4px) !important;
    transition: all ease-in 0.05s;
  }
`;

const InputForm = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: -30px;
`;
type CodeInputProps = {
    setCode: (code: number) => void;
    submitted: boolean;
  };
  
  const CodeInput = ({ setCode = () => {}, submitted }: CodeInputProps) => {
    const numInputs = 4;
    
    const inputRefs = useRef<HTMLInputElement[]>([]);
  
    const [values, setValues] = useState<string[]>(Array(numInputs).fill(""));
  
    useEffect(() => {
      if (values.every((value) => value)) {
        const code = parseInt(values.join(""));
        setCode(code);
        console.log(code);
      }
    }, [values, setCode]);
  
    const handleOnNumberInput = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValues = [...values];
      newValues[index] = e.target.value.slice(0, 1);
      setValues(newValues);
  
      if (index < numInputs - 1 && e.target.value) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < numInputs - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };
  
    const handleOnPaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const pastedData = e.clipboardData.getData("text").slice(0, numInputs);
  
      const newValues = pastedData.split("").map((char, index) => {
        inputRefs.current[index]?.focus();
        return char;
      });
  
      setValues(newValues);
    };
    console.log(inputRefs)
    return (
      <InputForm>
        {Array.from({ length: numInputs }, (_, index) => (
          <NumberInput key={index} type="number" value={values[index]} min="0" max="9" placeholder=" " onChange={handleOnNumberInput(index)} onKeyDown={handleKeyDown(index)} onPaste={handleOnPaste} ref={((e) => inputRefs.current[index] = e!)} autoFocus={index === 0} />
      ))}
    </InputForm>
  );
};

export default CodeInput;
