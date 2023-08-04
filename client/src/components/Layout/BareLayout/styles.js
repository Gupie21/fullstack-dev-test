import styled from 'styled-components'


export const BareContainer = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #353130;
  .company-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      font-family: var(--Font1);
      color: white;
      font-size: x-large;
      white-space: nowrap;
    }
  }
`;

export const  BareContent = styled.div`
  width: 100%;
  height: 100%;
`;

