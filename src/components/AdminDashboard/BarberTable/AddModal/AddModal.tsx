import { Input, Modal } from 'antd';
import { FC } from 'react';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getCookie } from '../../../../helpers/common';
import { addBarber } from '../../../../store/commercial/asyncThunks';

type Props = {
  isAddModalOpen: boolean;
  handleClose: () => void;
};

type AddBarberModel = {
  name: string;
  lastName: string;
  email: string;
  image: string;
};

export const AddModal: FC<Props> = ({
  isAddModalOpen,
  handleClose,
}) => {
  const { handleSubmit, control } = useForm<AddBarberModel>();
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;

  const onSubmit: SubmitHandler<AddBarberModel> = (data) => {
    if (token) {
      dispatch(addBarber({ token, body: data }));
    }
  };

  return (
    <Modal
      title="Add barber"
      open={isAddModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder="Name" {...field} />}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <Input placeholder="Last Name" {...field} />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="Email" {...field} />}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => <Input placeholder="Image" {...field} />}
        />
        <button>Add a barber</button>
      </form>
    </Modal>
  );
};
