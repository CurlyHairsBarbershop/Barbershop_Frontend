import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { MainColor } from '../../../constants/colors';

export const AuthRedirectLink = styled(NavLink)`
  font-size: 16px;
  color: ${MainColor};
  text-decoration: none;
`;
