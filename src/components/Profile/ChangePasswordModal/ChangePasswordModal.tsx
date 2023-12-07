import { Input, Modal } from 'antd';
import { FC } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { InputWrapper } from './styled';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { changePassword } from '../../../store/auth/asyncThunks';
import { getCookie } from '../../../helpers/common';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

interface IChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const ChangePasswordModal: FC<Props> = ({ isOpen, handleClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { currentPassword: '', newPassword: '' },
  });
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;

  const onSubmit: SubmitHandler<IChangePasswordInput> = (data) => {
    console.log(data);

    dispatch(
      changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        token,
      }),
    );
  };

  return (
    <Modal open={isOpen} title="Change password" footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="current password" />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="new password" />
            )}
          />
        </InputWrapper>
        <button>Change password</button>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};
