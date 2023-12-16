import { Input, Modal } from 'antd';
import { FC } from 'react';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getCookie } from '../../../../helpers/common';
import { addService } from '../../../../store/commercial/asyncThunks';
import { Service } from '../../../../types/Service/Service';
// TODO: test
type Props = {
  isAddModalOpen: boolean;
  handleClose: () => void;
};


export const AddModal: FC<Props> = ({
  isAddModalOpen,
  handleClose,
}) => {
  const { handleSubmit, control } = useForm<Omit<Service, 'id'>>();
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;

  const onSubmit: SubmitHandler<Omit<Service, 'id'>> = (data) => {
    if (token) {
      dispatch(addService({ token, body: data }));
    }
  };

  return (
    <Modal
      title="Add service"
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
          name="description"
          control={control}
          render={({ field }) => <Input placeholder="Last Name" {...field} />}
        />
        <Controller
          name="cost"
          control={control}
          render={({ field }) => <Input placeholder="Last Name" {...field} />}
        />
        <button>Add a Service</button>
      </form>
    </Modal>
  );
};
