import { FC } from 'react';
import { ConfigProvider, Tabs, type TabsProps } from 'antd';
// import { ServiceTable } from './ServicesTable/ServiceTable';
import { BarberTable } from './BarberTable/BarberTable';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Manage barbers',
    children: <BarberTable />,
  },
  {
    key: '2',
    label: 'Manage services',
    children: '<ServiceTable />',
  },
  {
    key: '3',
    label: 'Manage appointments',
    children: 'Here must be table with appointments',
  },
];

export const AdminDashboard: FC = () => {
  return (
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
      <Tabs style={{ width: '100%' }} items={items} />;
    </ConfigProvider>
  );
};
