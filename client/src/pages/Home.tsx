import { Page, useSwitchPage } from '../hooks';
import { generateRoomCode } from '../utility/generateRoomCode';
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
                Share texts, links, images, and files between devices or friends
                in a snap.{' '}
            </Description>
            <Description>
                Join a room and instantly start communicating. No login
                required.
            </Description>
            <Description>Experience frictionless messaging.</Description>
            <ButtonGroup $marginTop="75px" $gap="210px">
                <ActionButton onClick={handleCreateRoomClick}>
                    feeling lucky
                </ActionButton>
                <ActionButton onClick={handleJoinRoomClick}>
                    join a room
                </ActionButton>
            </ButtonGroup>
        </TitleContainer>
    );
};

export default Home;
