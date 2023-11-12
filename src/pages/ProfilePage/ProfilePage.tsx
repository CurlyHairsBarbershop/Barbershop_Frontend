import { FC, useEffect } from 'react';
import { getCookie } from '../../helpers/common';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getAccount } from '../../store/auth/asyncThunks';

export const ProfilePage: FC = () => {
  const token = getCookie('token');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAccount(token as string));
    console.log(user);
  }, [dispatch]);

  return <h1></h1>;
};
