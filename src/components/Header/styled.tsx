import styled from 'styled-components';
import { MainColor } from '../../constants/colors';
import { Image } from 'antd';
import { NavLink } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding-inline: 16px;

  background-color: ${MainColor};
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
  padding-inline: 8px;
  text-decoration: none;
  height: 70px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;