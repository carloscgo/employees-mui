import styled from 'styled-components';
import Container from '@mui/material/Container';

const App: any = styled(Container)`
  height: 100vh;
  min-width: 100vh;
  display: flex;
  flex-wrap: nowrap;

  .logo-mini {
    text-decoration: none;
  }
`;

App.Content = styled.div`
  padding: 30px 15px;
  min-height: calc(100% - 123px);

  &.p-0 {
    padding: 0;
  }
`;

export default App;
