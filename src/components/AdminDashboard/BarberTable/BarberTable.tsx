/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { Button, Image, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  deleteBarber,
  getBarbers,
} from '../../../store/commercial/asyncThunks';
import { ColumnType } from 'antd/es/table';
import { getCookie } from '../../../helpers/common';
import { actions } from '../../../store/commercial/slice';
import { EditModal } from './EditModal/EditModal';
import { AddModal } from './AddModal/AddModal';

export const BarberTable = () => {
  const dispatch = useAppDispatch();
  const barbers = useAppSelector((state) => state.commercial.barbers);
  const token = getCookie('token') as string;
  const deletedBarberMessage = useAppSelector(
    (state) => state.commercial.deletedBarberMessage,
  );
  const editedBarberMessage = useAppSelector(
    (state) => state.commercial.editedBarberMessage,
  );
  const newBarberMessage = useAppSelector(
    (state) => state.commercial.newBarber,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [barberIdToEdit, setBarberIdToEdit] = useState<number | null>(null);

  function base64toBlob(base64: string, contentType: string = 'image/jpeg') {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: contentType });
  }

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

  const dataSource = barbers.map((barber) => ({
    key: barber.id,
    name: barber.name,
    lastName: barber.lastName,
    email: barber.email,
    phoneNumber: barber.phoneNumber,
    imageUrl: base64toBlob(barber.imageUrl),
    description: barber.description,
  }));

  //@ts-ignore
  const columns: ColumnType[number][] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      //@ts-ignore
      render: (_, record: { imageUrl: Blob }) => {
        console.log(record);

        return dataSource.length >= 1 ? (
          <Image width={200} src={URL.createObjectURL(record.imageUrl)} />
        ) : null;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      //@ts-ignore
      render: (_, record: { key: React.Key }) => {
        console.log(record);

        return dataSource.length >= 1 ? (
          <Button
            style={{ backgroundColor: '#f6ffed', color: '#7fd454', borderColor: '#7fd454' }}
            onClick={() => {
              showModal();
              setBarberIdToEdit(Number(record.key.toString()));
            }}
          >
            Edit
          </Button>
        ) : null;
      },
    },
    {
      title: 'Delete',
      dataIndex: 'Delete',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button
            danger
            onClick={() => {
              dispatch(actions.clearLastDeletedBarberMessage());
              dispatch(
                deleteBarber({ token, id: Number(record.key.toString()) }),
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
  }, [dispatch, deletedBarberMessage, editedBarberMessage, newBarberMessage]);

  return (
    <>
      <Button style={{ marginBottom: '20px' }} onClick={showAddModal}>
        Create barber
      </Button>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      ></Table>
      <EditModal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        barberIdToEdit={barberIdToEdit}
        barbers={barbers}
      />
      <AddModal
        isAddModalOpen={isAddModalOpen}
        handleClose={handleCloseAddModal}
      />
    </>
  );
};
