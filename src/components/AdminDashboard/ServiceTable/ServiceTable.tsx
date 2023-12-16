import { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  deleteService,
  getBarbers,
} from '../../../store/commercial/asyncThunks';
import { ColumnType } from 'antd/es/table';
import { getCookie } from '../../../helpers/common';
import { actions } from '../../../store/commercial/slice';
import { EditModal } from './EditModal/EditModal';
import { AddModal } from './AddModal/AddModal';

export const BarberTable = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.commercial.services);
  const token = getCookie('token') as string;
  // TODO: Fix deleted service message 
  const deletedServiceMessage = useAppSelector(
    (state) => state.commercial.deletedService,
  );
  // TODO: Fix deleted service message 
  const editedServiceMessage = useAppSelector(
    (state) => state.commercial.editedService,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [serviceIdToEdit, setServiceIdToEdit] = useState<number | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const dataSource = services.map((service) => ({
    key: service.id,
    name: service.name,
    description: service.description,
    cost: service.cost,
  }));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const columns: ColumnType[number][] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'cost',
      dataIndex: 'cost',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button
            onClick={() => {
              showModal();
              setServiceIdToEdit(Number(record.key.toString()));
            }}
          >
            Edit
          </Button>
        ) : null,
    },
    {
      title: 'Delete',
      dataIndex: 'Delete',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button
            onClick={() => {
              // TODO: Fix
              dispatch(actions.clearLastDeletedBarberMessage());
              dispatch(
                deleteService({ token, id: Number(record.key.toString()) }),
              );
            }}
          >
            Delete
          </Button>
        ) : null,
    },
  ];

  useEffect(() => {
    dispatch(getBarbers());
  }, [dispatch, deletedServiceMessage, editedServiceMessage]);

  return (
    <>
      <Button style={{ marginBottom: '20px' }} onClick={showAddModal}>
        Create service
      </Button>
      <Table dataSource={dataSource} columns={columns}></Table>
      <EditModal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        barberIdToEdit={serviceIdToEdit}
        barbers={services}
      />
      <AddModal
        isAddModalOpen={isAddModalOpen}
        handleClose={handleCloseAddModal}
      />
    </>
  );
};
