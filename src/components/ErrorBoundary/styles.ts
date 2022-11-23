import styled from 'styled-components';
import Container from '@mui/material/Container';

const ErrorContainer = styled(Container)`
  width: 100vw !important;
  height: 100vh;
  max-width: 100% !important;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  background-image: url(${(props: { image: string }) => props.image});
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 0 !important;

  .btn-retry {
    border: none;
    position: relative;
    top: 50px;
  }
`;

export default ErrorContainer;
