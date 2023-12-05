import { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";

import logo from "../../assets/logo 1.png";
import Web3Status from "../Web3Status";
import {
  ActiveMenuItem,
  LogoContainer,
  MenuContainer,
  MenuItem,
  Nav,
  StatusContainer,
} from "./styled";

const MenuItemLink = ({ to, isActive, children }) => {
  const Component = isActive ? ActiveMenuItem : MenuItem;
  return (
    <Component to={to} style={{ textDecoration: "none", color: "#FFF" }}>
      {children}
    </Component>
  );
};

export const PageTabs = () => {
  const { pathname } = useLocation();
  const isHomeActive =
    pathname.startsWith("/") &&
    !pathname.includes("mint") &&
    !pathname.includes("breeding") &&
    !pathname.includes("dailyQuests") &&
    !pathname.includes("lastRites");

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Love your pet",
    },
    {
      key: "2",
      label: "Entertain your pet",
    },
    {
      key: "3",
      label: "Feed your pet",
    },
  ];
  return (
    <>
      <MenuItemLink to="/home" isActive={isHomeActive}>
        <div>Home</div>
      </MenuItemLink>
      <MenuItemLink to="/mint" isActive={pathname.startsWith("/mint")}>
        <div>Mint</div>
      </MenuItemLink>
      <MenuItemLink to="/breeding" isActive={pathname.startsWith("/breeding")}>
        <div>Breed</div>
      </MenuItemLink>
      <MenuItemLink
        to="/dailyQuests"
        isActive={pathname.startsWith("/dailyQuests")}
      >
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["3"],
          }}
        >
          <Typography.Link>
            <Space>
              Daily Quests
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </MenuItemLink>
      <MenuItemLink
        to="/lastRites"
        isActive={pathname.startsWith("/lastRites")}
      >
        <div>Funeral Opportunity</div>
      </MenuItemLink>
    </>
  );
};

const Navbar = () => {
  const history = useHistory();

  const handleLogoIconClick = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Nav>
      <LogoContainer>
        <img
          height={"90px"}
          width={"90px"}
          src={logo}
          alt="logo"
          onClick={handleLogoIconClick}
          className={"desktop"}
        />
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
