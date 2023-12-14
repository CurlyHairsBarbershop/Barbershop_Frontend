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
  Reviews,
  BarberImage,
  BarberImageContainer,
} from './stlyled';
import { Col, Image, Input, Rate } from 'antd';
import { SecondaryText, TitleText } from '../../common/Texts/Texts';
import { CloseButton, SubmitButton } from '../../common/Buttons/Buttons';
import { CloseOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  deleteBarber,
  dislikeBarber,
  editBarber,
  leaveCommentBarber,
  likeBarber,
} from '../../../store/commercial/asyncThunks';
import { getCookie } from '../../../helpers/common';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSpring, animated } from '@react-spring/web';
import { actions } from '../../../store/commercial/slice';

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
  const isAuth = useAppSelector((state) => state.auth.isAuth);

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
      dispatch(actions.clearIsFavouriteBarberMessage());
    }
  };

  const onDislikeBarber = () => {
    if (token) {
      dispatch(dislikeBarber({ token, id: barber.id }));
      dispatch(actions.clearIsFavouriteBarberMessage());
    }
  };

  const onDeleteBarber = () => {
    if (token) {
      dispatch(deleteBarber({ token, id: barber.id }));
      onClose();
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
      <Col
        xl={{ span: 6 }}
        lg={{ span: 8 }}
        md={{ span: 12 }}
        sm={{ span: 24 }}
        xs={{ span: 24 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', position: 'relative', maxWidth: '280px' }}>
          {isAuth && (
            <LikeWrapper>
              {favouriteBarbers.find(
                (favouriteBarber) => favouriteBarber.Id === barber.id,
              ) ? (
                  <LikeIcon onClick={onDislikeBarber} isFilled={true} />
                ) : (
                  <LikeIcon onClick={onLikeBarber} />
                )}
            </LikeWrapper>
          )}

          <BarberCardWrapper
            bgimage={
              'https://gentlemensclub.com.ua/storage/barbers/October2023/N5PTEfNBm9Erz49spyzB.jpg'
            }
            onClick={onOpen}
          >
            <BarberNameText>{`${barber?.name} ${barber?.lastName}`}</BarberNameText>
          </BarberCardWrapper>
        </div>
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
            <BarberImageContainer>
              <BarberImage
                style={{ borderRadius: '16px' }}
                // src={barber.imageUrl}
                src={
                  'https://gentlemensclub.com.ua/storage/barbers/October2023/N5PTEfNBm9Erz49spyzB.jpg'
                }
              />
            </BarberImageContainer>

            <BarberData>
              <TitleText>{barber?.name}</TitleText>
              <SecondaryText>{barber?.email}</SecondaryText>
              <SecondaryText>{barber?.phoneNumber}</SecondaryText>
              <SecondaryText>{barber?.description}</SecondaryText>
            </BarberData>
          </BarberInfo>

          <Reviews>
            <p style={{ fontSize: '20px' }}>Barber comments</p>
            <ReviewWrapper>
              {barber.reviews.map((review, i) => (
                <ReviewCard key={i}>
                  <p>{`${review.publisher.name} ${review.publisher.lastName}`}</p>
                  <Rate value={review.rating} disabled={true} />
                  <p>{review.content}</p>
                </ReviewCard>
              ))}
            </ReviewWrapper>
            {isAuth && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ReviewFormWrapper>
                  <Rate onChange={setScore} value={score} />
                  <TextArea
                    onChange={onChange}
                    placeholder="Write a comment..."
                  />
                  <SubmitButton type="submit">Comment</SubmitButton>
                </ReviewFormWrapper>
              </form>
            )}
          </Reviews>
        </InfoWrapper>

        {/* <button type="button" onClick={onOpenEdit}>
          Edit
        </button>
        <animated.div style={{ ...rollOut, overflow: 'hidden' }}>
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <EditBarberWrapper>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input placeholder="Name" {...field} />}
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
                render={({ field }) => <Input placeholder="Email" {...field} />}
              />
              <Controller
                name="image"
                control={control}
                render={({ field }) => <Input placeholder="Image" {...field} />}
              />
            </EditBarberWrapper>
            <button>Change a barber</button>
            <button type="button" onClick={onDeleteBarber}>
              Delete a barber
            </button>
          </form>
        </animated.div> */}
      </BarberWrapper>
    </>
  );
};
