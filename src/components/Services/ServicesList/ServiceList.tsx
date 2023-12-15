import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { ServiceItem } from '../ServiceItem/ServiceItem';
import { Logo, SecondVector, Vector, Wrapper } from './styled';
import { addService, getServices } from '../../../store/commercial/asyncThunks';
import { useSpring, animated } from '@react-spring/web';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Image, Input } from 'antd';
import { getCookie } from '../../../helpers/common';
import vector from '../../../public/images/ServicePage/vector.svg';
import vector2 from '../../../public/images/ServicePage/vector2.svg';
import logo from '../../../public/images/Header/logo.svg';

type EditService = {
  name: string;
  description: string;
  cost: number;
};

export const ServiceList = () => {
  const services = useAppSelector((state) => state.commercial.services);
  const newService = useAppSelector((state) => state.commercial.newService);
  const lastEditedService = useAppSelector(
    (state) => state.commercial.editedService,
  );
  const lastDeletedService = useAppSelector(
    (state) => state.commercial.deletedService,
  );
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const token = getCookie('token') as string;

  const [rollOut, api] = useSpring(() => ({
    from: { height: 0 },
  }));
  const { handleSubmit, control } = useForm<EditService>();

  const onOpenEdit = () => {
    api.start({
      from: { height: 0 },
      to: { height: 300 },
    });
  };

  useEffect(() => {
    dispatch(getServices());
  }, [lastDeletedService, lastEditedService, newService]);

  const onSubmit: SubmitHandler<EditService> = (data) => {
    if (token) {
      dispatch(
        addService({
          token,
          body: {
            name: data.name,
            description: data.description,
            cost: data?.cost,
          },
        }),
      );
    }
  };

  return (
    <Wrapper>
      <Vector>
        <Image src={vector} alt="vector" height={320} preview={false} />
      </Vector>
      
      <SecondVector>
        <Image src={vector2} alt="vector" height={160} preview={false} />
      </SecondVector>

      <Logo>
        <Image src={logo} alt="logo" height={80} preview={false} />
      </Logo>

      {services?.map((service) => (
        <ServiceItem service={service} key={service.id} />
      ))}
      {user?.email === 'admin@gmail.com' ? (
        <button type="button" onClick={onOpenEdit}>
          Create a service
        </button>
      ) : (
        <></>
      )}
      {user?.email === 'admin@gmail.com' ? (
        <animated.div
          style={{ ...rollOut, overflow: 'hidden', marginTop: '80px' }}
        >
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
            <button>Accept</button>
          </form>
        </animated.div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};
