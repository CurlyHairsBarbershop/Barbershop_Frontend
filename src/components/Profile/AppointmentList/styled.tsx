import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  background-color: #fff;
  border-radius: 24px;
`;

export const AppointsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 40px;
  margin-inline: auto;
`;

export const TableTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
`;