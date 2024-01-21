import styled from 'styled-components';

export const InputBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 33px;
    background: none;
    box-shadow: -2px 3px #ffffff;
    border: 2px solid white;
    margin: 0px 0px 0px 0px;
    &:hover {
        box-shadow: none;
        transform: translateY(4px) !important;
        transition: all ease-in 0.05s;
    }
    &:focus-within {
        box-shadow: none;
        transform: translateY(4px) !important;
        transition: all ease-in 0.05s;
    }
`;

export const InputBox = styled.input`
    width: 100%;
    box-sizing: border-box;
    height: 35px;
    background: none;
    color: #ffffff;
    border: none;
    outline: none;
`;

const ChatInput = () => {
    return (
        <InputBar>
            <InputBox></InputBox>
        </InputBar>
    );
};

export default ChatInput;
