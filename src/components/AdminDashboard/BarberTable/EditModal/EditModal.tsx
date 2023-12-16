import { Input, Modal } from 'antd';
import { FC } from 'react';
import { Barber } from '../../../../types/Barber/Barber';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getCookie } from '../../../../helpers/common';
import { editBarber } from '../../../../store/commercial/asyncThunks';
import { actions } from '../../../../store/commercial/slice';

type Props = {
  isModalOpen: boolean;
  handleClose: () => void;
  barberIdToEdit: number | null;
  barbers: Barber[];
};

type EditBarberModel = {
  name: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

export const EditModal: FC<Props> = ({
  isModalOpen,
  handleClose,
  barberIdToEdit,
  barbers,
}) => {
  const { handleSubmit, control, setValue } = useForm<EditBarberModel>();
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;

  const barberToEdit = barbers.find((barber) => barber.id === barberIdToEdit);

  if (barberToEdit) {
    setValue('name', barberToEdit?.name);
    setValue('lastName', barberToEdit?.lastName);
    setValue('email', barberToEdit?.email);
    setValue('imageUrl', barberToEdit?.imageUrl);
  }

  const onEditSubmit: SubmitHandler<EditBarberModel> = (data) => {
    if (token && barberToEdit) {
      dispatch(actions.clearEditedBarberMessage());
      dispatch(editBarber({ token, id: barberToEdit?.id, body: data }));
    }
  };

  return (
    <Modal
      title="Edit barber"
      open={isModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onEditSubmit)}>
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
          name="imageUrl"
          control={control}
          render={({ field }) => <Input placeholder="Image" {...field} />}
        />
        <button>Change a barber</button>
      </form>
    </Modal>
  );
};
