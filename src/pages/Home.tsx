import styled from "styled-components"
import { device } from "../designSystem/screenSizeConfig"
import { useNavigate } from "react-router-dom"

export const TitleContainer = styled.div<{translateX: number, translateY: number}>`
    padding: 10px;
    position: absolute;
    
    @media ${device.mobile} {
        left: 0;
        top: 0;   
    }

    @media ${device.desktop} {
        left: 50%;
        top: 50%;
        transform: translate(${props => props.translateX ? props.translateX : -50 }%, ${props => props.translateY ? props.translateY : -50}%);
        width: 75%;
    }
`


export const Title = styled.div`
    color: #FFFFFF;     
    font-family: IBM Plex Mono;
    font-size: 144px;
    font-weight: 700;
    line-height: 187px;
    letter-spacing: -0.05em;
    text-align: left;
    margin-left: -10px;
    margin-bottom: -25px;

`

const Tagline = styled.div`
    color: #FFFFFF;
    font-family: IBM Plex Mono;
    font-size: 72px;
    font-weight: 400;
    line-height: 94px;
    letter-spacing: -0.05em;
    text-align: left;
    @media ${device.mobile} {
        font-size: 62px;
    }
`

const Description = styled.div`
    color: #FFFFFF;
    font-family: IBM Plex Mono;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: -0.05em;
    text-align: left;
`
const ButtonGroup = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;   
    justify-content: center;
    align-items: center;
    margin-top: 75px;
    left: 0;
    width: 100%;
    gap: 210px;

`

const ActionButton = styled.button`
    box-shadow: -3px 5px #FFFFFF;
    transition: all ease-in .05s;

    font-family: IBM Plex Mono;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: -0.05em;
    text-align: left;

    background-color: #232323;
    border: 2px solid white;
    color: #FFFFFF;
    padding: 12px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;

    &:hover {
        box-shadow: none;
        transform: translateY(4px) !important;
        transition: all ease-in .05s;
    }
`


const Home = (): React.JSX.Element => {

    const navigate = useNavigate();

    function handleJoinRoomClick() {
      navigate("/join-room");
    }

    return (
        <TitleContainer translateX={-50} translateY={-75}>
            <Title>cache</Title>
            <Tagline>fast and simple file sharing</Tagline>
            <Description>Create private chat rooms in a snap. Share texts, links, images, and files securely. </Description>
            <Description>Everything vanishes once the chat ends, ensuring total privacy.</Description>
            <Description>Connect, share, and communicate with peace of mind.</Description>
            <ButtonGroup>
                <ActionButton>make a room</ActionButton>
                <ActionButton onClick={handleJoinRoomClick}>join a room</ActionButton>
            </ButtonGroup>
        </TitleContainer>
    )
}

export default Home