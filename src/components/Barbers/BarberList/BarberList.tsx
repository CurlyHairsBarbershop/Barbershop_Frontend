import { Row } from 'antd';
import { BarberCard } from '../BarberCard/BarberCard';

export const BarberList = () => {
  return (
    <Row style={{ rowGap: '20px', marginBottom: '40px' }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <BarberCard key={i} />
      ))}
    </Row>
  );
};
