import styled from "styled-components"
import { ActionButton, ButtonGroup, Description, Title, TitleContainer } from "./Home"
import CodeInput from "../components/CodeInput"

const JoinRoomDescription = styled(Description)`
    margin-top: 60px;
    text-align: center
`
const NumberBox = styled.input`
    background: linear-gradient(to right, #eff1f1, #eff1f1 25px, #232323 10px, #232323 40px, #eff1f1 40px, #eff1f1 65px, #232323 10px, #232323 80px, #eff1f1 80px, #eff1f1 105px, #232323 10px, #232323 120px, #eff1f1 120px, #eff1f1 145px, #232323 10px, #232323 160px);
    width: 180px !important;
    height: 30px !important;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 29px;
    padding-left: 5px;
    text-align: left;
    margin: 10px auto -5px auto;
    color: transparent !important;
    text-shadow: 0px 0px 0px #666;
    border: 1px red solid;
    -webkit-appearance: none;
    appearance: none;

    &:focus {
        outline: none;
    }
`

const JoinRoom = (): React.JSX.Element => {
    return (
        <TitleContainer>
            <Title>join a room</Title>
            <JoinRoomDescription>Enter the 4-digit code below to join the room.</JoinRoomDescription>
            <CodeInput/>
            <ButtonGroup>
                <ActionButton>join</ActionButton>
            </ButtonGroup>
        </TitleContainer>
    )
}

export default JoinRoom