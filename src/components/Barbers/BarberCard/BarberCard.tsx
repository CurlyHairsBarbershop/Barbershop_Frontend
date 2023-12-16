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
  Reviews,
  BarberImage,
  BarberImageContainer,
  Wrapper,
} from './stlyled';
import { Col, Rate } from 'antd';
import { SecondaryText, TitleText } from '../../common/Texts/Texts';
import { CloseButton, SubmitButton } from '../../common/Buttons/Buttons';
import { CloseOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  dislikeBarber,
  leaveCommentBarber,
  likeBarber,
} from '../../../store/commercial/asyncThunks';
import { getCookie } from '../../../helpers/common';
import { useForm } from 'react-hook-form';
import { actions } from '../../../store/commercial/slice';

type Props = {
  barber: Barber;
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
  const { handleSubmit } = useForm();


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
        <Wrapper>
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
        </Wrapper>
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
      </BarberWrapper>
    </>
  );
};
