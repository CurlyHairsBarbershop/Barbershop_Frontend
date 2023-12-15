import { FC } from 'react';
import { Wrapper } from './styled';

type Props = {
  children: React.ReactNode;
};

export const AuthContainer: FC<Props> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);
