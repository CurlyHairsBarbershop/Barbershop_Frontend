import { FC, useState } from 'react';
import { Barber } from '../../../types/Barber/Barber';
import {
  BarberData,
  BarberWrapper,
  InfoWrapper,
  BarberCardWrapper,
  BarberNameText,
  BarberInfo,
  ReviewWrapper,
  ReviewCard,
  ReviewFormWrapper,
  LikeWrapper,
  LikeIcon,
  EditBarberWrapper,
} from './stlyled';
import { Col, Image, Input, Rate } from 'antd';
import { SecondaryText, TitleText } from '../../common/Texts/Texts';
import { CloseButton } from '../../common/Buttons/Buttons';
import { CloseOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  dislikeBarber,
  editBarber,
  leaveCommentBarber,
  likeBarber,
} from '../../../store/commercial/asyncThunks';
import { getCookie } from '../../../helpers/common';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSpring, animated } from '@react-spring/web';

type Props = {
  barber: Barber;
};

type EditBarberModel = {
  name: string;
  lastName: string;
  email: string;
  image: string;
};

export const BarberCard: FC<Props> = ({ barber }) => {
  const [isBarberShown, setIsBarberShown] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState('');
  const token = getCookie('token') as string;
  const favouriteBarbers = useAppSelector(
    (state) => state.commercial.favouriteBarbers,
  );

  const dispatch = useAppDispatch();
  const [rollOut, api] = useSpring(() => ({
    from: { height: 0 },
  }));
  const { handleSubmit, control } = useForm<EditBarberModel>();

  const onOpenEdit = () => {
    api.start({
      from: { height: 0 },
      to: { height: 300 },
    });
  };

  const onOpen = () => {
    setIsBarberShown(true);
  };

  const onClose = () => {
    setIsBarberShown(false);
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };

  const onLikeBarber = () => {
    if (token) {
      dispatch(likeBarber({ token, id: barber.id }));
    }
  };

  const onDislikeBarber = () => {
    if (token) {
      dispatch(dislikeBarber({ token, id: barber.id }));
    }
  };

  const onSubmit = () => {
    if (token) {
      dispatch(
        leaveCommentBarber({
          commentBody: {
            barberEmail: barber.email,
            content: text,
            rating: +score,
            title: 'Review',
          },
          token,
        }),
      );
    }
  };

  const onEditSubmit: SubmitHandler<EditBarberModel> = (data) => {
    if (token) {
      dispatch(editBarber({ token, id: barber.id, body: data }));
    }
  };

  return (
    <>
      <Col span={6}>
        <BarberCardWrapper
          bgimage={
            'https://gentlemensclub.com.ua/storage/barbers/October2023/N5PTEfNBm9Erz49spyzB.jpg'
          }
          onClick={onOpen}
        >
          <LikeWrapper>
            {favouriteBarbers.find(
              (favouriteBarber) => favouriteBarber.Id === barber.id,
            ) ? (
              // eslint-disable-next-line indent
              <LikeIcon onClick={onDislikeBarber} isFilled={true} />
              ) : (
              // eslint-disable-next-line indent
              // eslint-disable-next-line indent
              <LikeIcon onClick={onLikeBarber} />
              // eslint-disable-next-line indent
            )}
          </LikeWrapper>
          <BarberNameText>{`${barber?.name} ${barber?.lastName}`}</BarberNameText>
        </BarberCardWrapper>
      </Col>
      <BarberWrapper
        open={isBarberShown}
        footer={null}
        closeIcon={false}
        centered={true}
      >
        <CloseButton onClick={onClose}>
          <CloseOutlined style={{ color: '#fff', fontSize: '24px' }} />
        </CloseButton>
        <InfoWrapper>
          <BarberInfo>
            <Image
              style={{ width: '100%', maxWidth: '240px', display: 'block' }}
              src={barber.imageUrl}
            />
            <BarberData>
              <TitleText>{barber?.name}</TitleText>
              <SecondaryText>{barber?.email}</SecondaryText>
              <SecondaryText>{barber?.phoneNumber}</SecondaryText>
              <SecondaryText>{barber?.description}</SecondaryText>
            </BarberData>
          </BarberInfo>
          <ReviewWrapper title="Barber comments">
            {barber.reviews.map((review, i) => (
              <ReviewCard key={i}>
                <p>{review.content}</p>
              </ReviewCard>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
              <ReviewFormWrapper>
                <Rate onChange={setScore} value={score} />
                <TextArea onChange={onChange} />
                <button type="submit">Comment</button>
              </ReviewFormWrapper>
            </form>
          </ReviewWrapper>
        </InfoWrapper>
        <button type="button" onClick={onOpenEdit}>
          Edit
        </button>
        <animated.div style={{ ...rollOut, overflow: 'hidden' }}>
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <EditBarberWrapper>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Name" {...field} />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Last Name" {...field} />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Email" {...field} />
                )}
              />
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Image" {...field} />
                )}
              />
            </EditBarberWrapper>
            <button>Change a barber</button>
          </form>
        </animated.div>
      </BarberWrapper>
    </>
  );
};
