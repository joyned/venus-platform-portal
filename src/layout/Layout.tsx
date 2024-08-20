import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, layout } from "../components/ui/Variables";
import ILeftMenu from "../model/ILeftMenu";
import IMenuItem from "../model/IMenuItem";
import UUIDService from "../service/UUIDService";
import UserMenuService from "../service/UserMenuService";
import { ToastContainer } from "react-toastify";
import { useLoading } from "../components/Loading";


const Main = styled.main`
    background-color: ${layout.lightGrey};
    width: 100vw;
    height: 100vh;
`

const TopBar = styled.div`
    background-color: ${layout.black};
    position: sticky;
    width: 100%;
`

const TopBarContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 50px;
    max-height: 50px;
    margin: 0 10px;
`

const TopBarItem = styled.div`
    position: relative;
    display: flex;
    svg {
        color: white;
        font-size: 30px;
        cursor: pointer;
    }

    img {
        width: 155px;
        cursor: pointer;
    }
`

const TopBarItemMenuButton = styled.div`
    svg {
        color: white;
        font-size: 30px;
        cursor: pointer;
    }

    @media(min-width: 763px) {
        display: none;
    }
`

const LeftBar = styled.div<{ $opened: boolean }>`
    position: fixed;
    min-width: 250px;
    max-width: 250px;
    height: 100%;
    top: 50px;

    background-color: ${layout.white};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    @media(max-width: 763px) {
        visibility: ${props => props.$opened ? "visible" : "hidden"};
        opacity: ${props => props.$opened ? 1 : 0};
        transition: visibility 0s, opacity 0.5s linear;
    }
`

const LeftBarContent = styled.div`
    margin: 20px;
`

const LeftBarMenu = styled.div``

const LeftBarMenuItem = styled.div``

const LeftBarMenuItemTitle = styled.div`
    color: ${layout.menuTitleColor};
    font-size: ${layout.menuTitleFontSize};
    display: flex;
    align-items: center;
    gap: 10px;
`

const LeftBarMenuItemItems = styled.div`
    margin-left: 25px;
    margin-bottom: 15px;
`

const LeftBarMenuItemItemsItem = styled.div<{ $active?: boolean }>`
    cursor: pointer;
    color: ${props => props.$active ? colors.link : layout.menuItemColor};
    font-size: ${layout.menuItemFontSize};
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 15px 0;

    &:hover {
        transform: scale(1.01);
        color: ${colors.link}
    }
`;

const UserDropdownMenu = styled.div<{ $userMenuOpened?: boolean }>`
    display: ${props => props.$userMenuOpened ? 'block' : 'none'};
    position: absolute;
    right: 0;
    background: ${layout.lightGrey};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    width: 200px;
    border-radius: 5px;
    z-index: 29999999;
`;

const UpArrow = styled.div`
    position: absolute;
    right: 10px;
    top: -2px;
    z-index: 1;
    border: solid ${layout.lightGrey};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
`

const UserDropdownMenuItem = styled.div`
    padding: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
        font-size: 20px;
        color: ${layout.menuItemColor};
    }

    &:hover {
        background: ${layout.white};
        border-radius: 5px;
    }
`

const MainContent = styled.div<{ $needMargin?: boolean }>`
    margin: 15px;
    margin-left: ${props => props.$needMargin ? '270px' : ''};
    
    @media(max-width: 763px) {
        margin-left: 15px;
    }
`;

export default function Layout(props: { children?: React.ReactNode, displayLeftMenu?: boolean, leftMenu?: ILeftMenu }) {
    const { loading } = useLoading();
    const navigate = useNavigate();
    const [leftBarOpened, setLeftBarOpened] = useState(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const userMenu = UserMenuService.getMenu();

    const onLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <Main>
            <ToastContainer />
            <TopBar>
                <TopBarContent>
                    <TopBarItemMenuButton className="menuButton">
                        <IoMenuOutline onClick={() => setLeftBarOpened(!leftBarOpened)} />
                    </TopBarItemMenuButton>
                    <TopBarItem>
                        <img src={process.env.PUBLIC_URL + "/logo-no-background-left.svg"} alt="Logo" onClick={() => navigate('/')}></img>
                        {loading && <img src={process.env.PUBLIC_URL + "/loading.svg"} alt="Loading" style={{width: '40px'}}></img>}
                    </TopBarItem>
                    <TopBarItem>
                        <IoMdSettings onClick={() => setUserMenuOpened(!userMenuOpened)} />
                        <UserDropdownMenu $userMenuOpened={userMenuOpened}>
                            <UpArrow />
                            {userMenu.map((item: IMenuItem) => {
                                return (
                                    <UserDropdownMenuItem key={UUIDService.generateUUID()} onClick={() => navigate(item.uri)}>
                                        {item.icon}
                                        {item.title}
                                    </UserDropdownMenuItem>
                                )
                            })}
                            <UserDropdownMenuItem onClick={() => onLogout()}>
                                <CiLogout />
                                Logout
                            </UserDropdownMenuItem>
                        </UserDropdownMenu>
                    </TopBarItem>
                </TopBarContent>
            </TopBar>
            <LeftBar $opened={leftBarOpened} style={{ display: props.displayLeftMenu ? 'block' : 'none' }}>
                <LeftBarContent>
                    <LeftBarMenu>
                        <LeftBarMenuItem>
                            <LeftBarMenuItemTitle>
                                <FaProjectDiagram />
                                {props.leftMenu?.menuTitle}
                            </LeftBarMenuItemTitle>
                            <LeftBarMenuItemItems>
                                {props.leftMenu && props.leftMenu.items.map((item, index) => {
                                    return (
                                        <LeftBarMenuItemItemsItem key={index} $active={window.location.pathname === item.uri} onClick={() => navigate(item.uri)}>
                                            {item.title}
                                        </LeftBarMenuItemItemsItem>
                                    )
                                })}
                            </LeftBarMenuItemItems>
                        </LeftBarMenuItem>
                    </LeftBarMenu>
                </LeftBarContent>
            </LeftBar>
            <MainContent $needMargin={props.displayLeftMenu} onClick={() => {
                setLeftBarOpened(!leftBarOpened);
                setUserMenuOpened(false);
            }}>
                {props.children}
            </MainContent>
        </Main>
    )
}