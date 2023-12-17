/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Input, Modal } from 'antd';
import { FC, useCallback, useState } from 'react';
import { Barber } from '../../../../types/Barber/Barber';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getCookie } from '../../../../helpers/common';
import { editBarber } from '../../../../store/commercial/asyncThunks';
import { actions } from '../../../../store/commercial/slice';
import { useDropzone } from 'react-dropzone';

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
  image: string;
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
  const [image, setImage] = useState('');

  const barberToEdit = barbers.find((barber) => barber.id === barberIdToEdit);

  if (barberToEdit) {
    setValue('name', barberToEdit?.name);
    setValue('lastName', barberToEdit?.lastName);
    setValue('email', barberToEdit?.email);
  }

  const onEditSubmit: SubmitHandler<EditBarberModel> = (data) => {
    if (token && barberToEdit) {
      dispatch(actions.clearEditedBarberMessage());
      dispatch(
        editBarber({
          token,
          id: barberToEdit?.id,
          body: { ...data, image },
        }),
      );
    }
  };

  const handleFileChange = (acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr = reader.result;
      //@ts-ignore
      const base64Str = btoa(binaryStr);
      setImage(base64Str);
    };

    reader.readAsBinaryString(file);
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    handleFileChange(acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
      //@ts-ignore
      accept: 'image/*',
    });

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
          name="image"
          control={control}
          render={({ field }) => (
            <div {...getRootProps()}>
              <input {...field} {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p>Drop an image here, or click to select a file</p>
              )}
              {acceptedFiles &&
                acceptedFiles.map((file) => (
                  <p key={file.name}>
                    {file.name} - {file.size} bytes
                  </p>
                ))}
            </div>
          )}
        />
        <button>Change a barber</button>
      </form>
    </Modal>
  );
};
