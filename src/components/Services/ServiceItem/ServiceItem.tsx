import { FC, useState } from 'react';
import { ServiceName, Wrapper } from './styled';
import { Service } from '../../../types/Service/Service';
import { Button, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { getCookie } from '../../../helpers/common';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  deleteService,
  editService,
} from '../../../store/commercial/asyncThunks';

type Props = {
  service: Service;
};

type EditService = {
  name: string;
  description: string;
  cost: number;
};

export const ServiceItem: FC<Props> = ({ service }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, control } = useForm<EditService>();

  const showModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<EditService> = (data) => {
    if (token) {
      dispatch(
        editService({
          token,
          id: service.id,
          body: {
            name: data.name,
            description: data.description,
            cost: data?.cost,
          },
        }),
      );
    }
  };

  const onDeleteService = () => {
    dispatch(deleteService({ token, id: service.id }));
    closeModal();
  };

  return (
    <>
      <Wrapper>
        <ServiceName>{service.name}</ServiceName>

        <ServiceName>{service.cost}</ServiceName>
        {user?.email === 'admin@gmail.com' && (
          <Button onClick={showModal}>Edit</Button>
        )}
      </Wrapper>
      <Modal open={isOpen} title="Change password" footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input placeholder="Service Name" {...field} />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input placeholder="Description" {...field} />
            )}
          />
          <Controller
            name="cost"
            control={control}
            render={({ field }) => <Input placeholder="Cost" {...field} />}
          />
          <button>Edit</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button type="button" onClick={onDeleteService}>
            Remove service
          </button>
        </form>
      </Modal>
    </>
  );
};
