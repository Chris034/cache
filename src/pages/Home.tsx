import styled from "styled-components"
import { device } from "../designSystem/screenSizeConfig"


const HomeContainer = styled.div`
    position: relative;
    border: 1px solid green;
    height: 100vh;
`

const TitleContainer = styled.div`
    padding: 10px;
    position: absolute;

    @media ${device.mobile} {
        left: 0;
        top: 0;   
    }

    @media ${device.desktop} {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -65%);
        width: 80%;
    }
`


const Title = styled.div`
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



const Home = (): React.JSX.Element => {
    return (
        <HomeContainer>
            <TitleContainer>
                <Title>cache</Title>
                <Tagline>fast and simple file sharing</Tagline>
                <Description>Create private chat rooms in a snap. Share texts, links, images, and files securely. </Description>
                <Description>Everything vanishes once the chat ends, ensuring total privacy.</Description>
                <Description>Connect, share, and communicate with peace of mind.</Description>
                <button>Make A Room</button>
                <button>Join A Room</button>

            </TitleContainer>
        </HomeContainer>
    )
}

export default Home