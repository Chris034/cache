import { Outlet } from "react-router-dom"

const Layout = (): React.JSX.Element => {
    return (
        <>      
            <Outlet />
        </>
    )
}

export default Layout