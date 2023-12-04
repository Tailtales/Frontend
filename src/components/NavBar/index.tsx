import { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';


import Logo from '../../assets/react.svg';
import Web3Status from '../Web3Status';
import { ActiveMenuItem, LogoContainer, MenuContainer, MenuItem, Nav, StatusContainer } from './styled';

const MenuItemLink = ({ to, isActive, children }) => {
  const Component = isActive ? ActiveMenuItem : MenuItem;
  return (
    <Component
      to={to}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </Component>
  );
};

export const PageTabs = () => {
  const { pathname } = useLocation();

  return (
    <>
      <MenuItemLink to="/breeding" isActive={pathname.startsWith('/breeding')}>
        <div>Breeding</div>
      </MenuItemLink>
      <MenuItemLink to="/dailyQuests" isActive={pathname.startsWith('/dailyQuests')}>
        <div>Daily Quests</div>
      </MenuItemLink>
      <MenuItemLink to="/lastRites" isActive={pathname.startsWith('/lastRites')}>
        <div>Last Rites</div>
      </MenuItemLink>
    </>
  );
};

const Navbar = () => {
  const history = useHistory();


  const handleLogoIconClick = useCallback(() => {
    history.push("/")
  }, [ history]);

  return (
    <Nav>
      <LogoContainer>
        <img width={'195px'} height={'32px'} src={Logo} alt="logo" onClick={handleLogoIconClick} className={'desktop'} />
      </LogoContainer>

      <MenuContainer>
        <PageTabs />
      </MenuContainer>

      <StatusContainer>
        <Web3Status />
      </StatusContainer>
    </Nav>

  );
};

export default Navbar;
