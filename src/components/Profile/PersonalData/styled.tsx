import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  gap: 20px;
`;

export const AccountSetting = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AccountField = styled.p`
  font-size: 18px;
`;

export const AccountValue = styled.p`
  font-size: 18px;
  text-align: center;
`;

export const PasswordContainer = styled.div`
  position: relative;
`;

export const ChangePasswordIcon = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
`;
