import { FC } from 'react';

import { ConfigProvider, Tabs, type TabsProps } from 'antd';
import { PersonalData } from './PersonalData/PersonalData';
import { AppointmentList } from './AppointmentList/AppointmentList';
import { Wrapper } from './styled';
import { FavouriteBarberList } from '../Barbers/FavouriteBarbersList/FavouriteBarbersList';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Personal data',
    children: <PersonalData />,
  },
  {
    key: '2',
    label: 'Appointments',
    children: <AppointmentList />,
  },
  {
    key: '3',
    label: 'Favourite barbers',
    children: <FavouriteBarberList />
  }
];

export const Profile: FC = () => {
  return (
    <Wrapper>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: '#ffffff',
              itemSelectedColor: '#4f73cd',
              itemHoverColor: '#4f73cd',
              inkBarColor: '#4f73cd',
            },
          },
        }}
      >
        <Tabs style={{width: '100%'}} items={items} />;
      </ConfigProvider>
    </Wrapper>
  );
};
