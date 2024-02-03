import { Page, useSwitchPage } from '../hooks';
import { generateRoomCode } from '../commonLogic/generateRoomCode';
import {
    TitleContainer,
    Title,
    Tagline,
    Description,
    ButtonGroup,
    ActionButton
} from '../components';

const Home = (): React.JSX.Element => {
    const { navigateTo } = useSwitchPage();

    function handleJoinRoomClick() {
        navigateTo(Page.JoinRoomPage);
    }

    function handleCreateRoomClick() {
        navigateTo(Page.ChatRoomPage, generateRoomCode());
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
            <ButtonGroup $marginTop="75px" $gap="210px">
                <ActionButton onClick={handleCreateRoomClick}>
                    make a room
                </ActionButton>
                <ActionButton onClick={handleJoinRoomClick}>
                    join a room
                </ActionButton>
            </ButtonGroup>
        </TitleContainer>
    );
};

export default Home;
