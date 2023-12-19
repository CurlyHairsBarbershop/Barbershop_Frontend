import { Input, Modal } from 'antd';
import { FC } from 'react';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getCookie } from '../../../../helpers/common';
import { editService } from '../../../../store/commercial/asyncThunks';
import { actions } from '../../../../store/commercial/slice';
import { Service } from '../../../../types/Service/Service';

type Props = {
  isModalOpen: boolean;
  handleClose: () => void;
  serviceIdToEdit: number | null;
  services: Service[];
};

type EditServiceModel = {
  name: string;
  description: string;
  cost: number;
};

export const EditModal: FC<Props> = ({
  isModalOpen,
  handleClose,
  serviceIdToEdit,
  services,
}) => {
  const { handleSubmit, control, setValue } = useForm<EditServiceModel>();
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;

  const serviceToEdit = services.find((service) => service.id === serviceIdToEdit);

  if (serviceToEdit) {
    setValue('name', serviceToEdit?.name);
    setValue('description', serviceToEdit?.description);
    setValue('cost', serviceToEdit?.cost);
  }

  const onEditSubmit: SubmitHandler<EditServiceModel> = (data) => {
    if (token && serviceToEdit) {
      dispatch(actions.clearEditedServiceMessage());
      dispatch(editService({ token, id: serviceToEdit?.id, body: data }));
    }
  };

  return (
    <Modal
      title="Edit service"
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
          name="description"
          control={control}
          render={({ field }) => <Input placeholder="Description" {...field} />}
        />
        <Controller
          name="cost"
          control={control}
          render={({ field }) => <Input placeholder="Cost" {...field} />}
        />
        <button>Edit</button>
      </form>
    </Modal>
  );
};
