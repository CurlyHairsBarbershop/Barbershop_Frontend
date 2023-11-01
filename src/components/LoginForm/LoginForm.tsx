import { FC, useState } from 'react';
import { Button, Input } from 'antd';
import { useAppDispatch } from '../../store/hooks/hooks';
import { signUp } from '../../store/auth/asyncThunks';

interface RegisterModel {
  email: string;
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export const LoginForm: FC = () => {
  const [newUser, setNewUser] = useState<RegisterModel>({
    email: '',
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useAppDispatch();
  const handleFieldChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log(newUser);
    setNewUser((prevUser) => {
      return {
        ...prevUser,
        [fieldName]: event.target.value,
      };
    });
  };

  const onSubmit = async () => {
    await dispatch(signUp(newUser));
  };

  return (
    <>
      <Input
        placeholder="email"
        value={newUser.email}
        onChange={(event) => handleFieldChange('email', event)}
      />
      <Input
        placeholder="name"
        value={newUser.name}
        onChange={(event) => handleFieldChange('name', event)}
      />
      <Input
        placeholder="lastName"
        value={newUser.lastName}
        onChange={(event) => handleFieldChange('lastName', event)}
      />
      <Input
        placeholder="password"
        value={newUser.password}
        onChange={(event) => handleFieldChange('password', event)}
      />
      <Input
        placeholder="confirmPassword"
        value={newUser.confirmPassword}
        onChange={(event) => handleFieldChange('confirmPassword', event)}
      />
      <Button onClick={onSubmit}>
        Sign Up
      </Button>
    </>
  );
};
