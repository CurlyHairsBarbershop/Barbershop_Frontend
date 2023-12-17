/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Modal } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { actions } from '../../../../store/commercial/slice';
import { addBarber } from '../../../../store/commercial/asyncThunks';
import { getCookie } from '../../../../helpers/common';

type Props = {
  isAddModalOpen: boolean;
  handleClose: () => void;
};

type AddBarberModel = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export const AddModal: FC<Props> = ({ isAddModalOpen, handleClose }) => {
  const { handleSubmit, control } = useForm<AddBarberModel>();
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;
  const [image, setImage] = useState('');

  const onSubmit: SubmitHandler<AddBarberModel> = (data) => {
    dispatch(actions.clearLastBarber);
    dispatch(addBarber({ token, body: { ...data, image } }));
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
      title="Add barber"
      open={isAddModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <Input placeholder="First Name" {...field} />}
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
        <button>Add a barber</button>
      </form>
    </Modal>
  );
};
