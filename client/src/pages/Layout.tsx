import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
    position: relative;
    height: 100vh;
`;

const Layout = (): React.JSX.Element => {
    return (
        <HomeContainer>
            <Outlet />
        </HomeContainer>
    );
};

export default Layout;
