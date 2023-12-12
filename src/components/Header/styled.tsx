import styled from 'styled-components';
import { Image } from 'antd';
import { NavLink } from 'react-router-dom';

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
