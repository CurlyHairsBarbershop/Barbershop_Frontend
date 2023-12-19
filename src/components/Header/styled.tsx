import styled from 'styled-components';
import { Image } from 'antd';
import { NavLink } from 'react-router-dom';
import { animated } from '@react-spring/web';
import { DarkColor } from '../../constants/colors';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding-inline: 16px;

  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 12px;
  z-index: 10;

  position: fixed;
  top: 10px;
  right: 16px;
  left: 16px;
`;

export const SectionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Logo = styled(Image)`
  width: 50px !important;
  height: 50px !important;

  background-color: #fff;
  border: 0.5px solid #fff;
  border-radius: 50%;
`;

export const SectionList = styled.div`
  display: flex;
  margin: 0;
  padding: 0;

  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Section = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-inline: 12px;
  text-decoration: none;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;
  border-radius: 12px;
`;

export const SectionLogout = styled(Section)`
  border-radius: 16px !important;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(54, 68, 88, 0.7) !important;
  }
`;

export const SectionText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-inline: 12px;
  text-decoration: none;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;
  border-radius: 16px !important;

  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(54, 68, 88, 0.7) !important;
  }
`;

export const MenuIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;

  background-color: rgba(54, 68, 88, 0.7);
  border-radius: 8px;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MenuWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 30px;
  overflow-y: hidden;

  position: fixed;
  top: 0;

  background: ${DarkColor};
  z-index: 1000;
`;

export const MenuSection = styled(Section)`
  width: 100%;
`;

export const MobileHeaderActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
