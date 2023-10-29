import styled from 'styled-components';
import { MainColor } from '../../constants/colors';
import { Image } from 'antd';
import { NavLink } from 'react-router-dom';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  background-color: ${MainColor};
`;

export const SectionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Logo = styled(Image)`
  background-color: #fff;
  width: 70px !important;
  height: 70px !important;
`;

export const SectionList = styled.div`
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 0;

  list-style: none;
`;

export const Section = styled(NavLink)`
  margin: 0;
  padding: 0;
  text-decoration: none;

  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;