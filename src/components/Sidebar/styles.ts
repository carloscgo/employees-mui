import styled from 'styled-components';
import Box from '@mui/material/Box';

const Container = styled(Box)`
  overflow: auto;
  max-height: 100%;
  height: 100%;
  padding-top: 10px;
  color: #fff;
  font-weight: 200;
  display: flex;
  
  .sidebar-background {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    max-width: 260px;
    display: block;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center center;

    .sidebar-wrapper {
      position: relative;
      max-height: calc(100vh - 75px);
      min-height: 100%;
      overflow: auto;
      width: 100%;
      z-index: 4;
      padding-bottom: 100px;

      .logo {
        padding: 10px 15px;
        border-bottom: 1px solid rgba(255,255,255,.2);
        position: relative;
        z-index: 4;
        display: flex;
        align-items: center;
        justify-content: center;

        .logo-mini {
          text-decoration: none;
          margin-right: 0.25rem!important;
          margin-left: 0.25rem!important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .simple-text {
          display: block;
          padding: 5px 0 5px 5px;
          font-size: 1rem;
          color: #fff;
          text-align: center;
          font-weight: 400;
          line-height: 30px;
        }
      }
    }
  }
`;

export default Container;
