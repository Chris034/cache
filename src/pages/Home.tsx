import styled from 'styled-components';
import { device } from '../designSystem/screenSizeConfig';
import { Page, useSwitchPage } from '../hooks';

export const TitleContainer = styled.div<{
    translateX?: number;
    translateY?: number;
}>`
    padding: 10px;
    position: absolute;

    @media ${device.mobile} {
        left: 0;
        top: 0;
    }

    @media ${device.desktop} {
        left: 12%;
        top: 20%;
        transform: translate(
            ${(props) => (props.translateX ? props.translateX : 0)}%,
            ${(props) => (props.translateY ? props.translateY : 0)}%
        );
        width: 75%;
    }
`;

export const Title = styled.div`
    color: #ffffff;
    font-family: IBM Plex Mono;
    font-size: 144px;
    font-weight: 700;
    line-height: 187px;
    letter-spacing: -0.05em;
    text-align: left;
    margin-left: -10px;
    margin-bottom: -25px;
`;

const Tagline = styled.div`
    color: #ffffff;
    font-family: IBM Plex Mono;
    font-size: 72px;
    font-weight: 400;
    line-height: 94px;
    letter-spacing: -0.05em;
    text-align: left;
    @media ${device.mobile} {
        font-size: 62px;
    }
`;

export const Description = styled.div`
    color: #ffffff;
    font-family: IBM Plex Mono;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: -0.05em;
    text-align: left;
`;
export const ButtonGroup = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 75px;
    left: 0;
    width: 100%;
    gap: 210px;
`;

export const ActionButton = styled.button`
    box-shadow: -3px 5px #ffffff;
    transition: all ease-in 0.05s;

    font-family: IBM Plex Mono;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: -0.05em;
    text-align: left;

    background-color: #232323;
    border: 2px solid white;
    color: #ffffff;
    padding: 12px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;

    &:hover {
        box-shadow: none;
        transform: translateY(4px) !important;
        transition: all ease-in 0.05s;
    }
`;

const Home = (): React.JSX.Element => {
    const navigateTo = useSwitchPage();

    function handleJoinRoomClick() {
        navigateTo(Page.JoinRoomPage);
    }

    return (
        <TitleContainer>
            <Title>cache</Title>
            <Tagline>fast and simple file sharing</Tagline>
            <Description>
                Create private chat rooms in a snap. Share texts, links, images,
                and files securely.{' '}
            </Description>
            <Description>
                Everything vanishes once the chat ends, ensuring total privacy.
            </Description>
            <Description>
                Connect, share, and communicate with peace of mind.
            </Description>
            <ButtonGroup>
                <ActionButton>make a room</ActionButton>
                <ActionButton onClick={handleJoinRoomClick}>
                    join a room
                </ActionButton>
            </ButtonGroup>
        </TitleContainer>
    );
};

export default Home;
