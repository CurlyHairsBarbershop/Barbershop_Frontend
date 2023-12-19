import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

export const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  padding: 40px;
  margin-bottom: 40px;

  border-radius: 24px;
  
  background-color: #fff;
`;

export const AccountSettings = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  width: 100%;
  gap: 40px;
`;

export const AccountSetting = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AccountField = styled.p`

`;

export const AccountValue = styled.p`

`;

export const AppointsWrapper = styled.div`
max-width: 800px;
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
justify-items: center;
gap: 20px;
padding: 20px;
margin-bottom: 40px;

background-color: #fff;
border-radius: 24px;
`;
