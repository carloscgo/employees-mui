/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from "react";
import Button from '@mui/material/Button'

import Container from './styles';
import image from '../../assets/error.svg'

type Props = {
  children: ReactElement | HTMLElement | any
}
type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container maxWidth='lg' image={image}>
          <Button variant="text" color="primary" size="large" classes={"btn-retry"} onClick={() => window.location.reload()}>
            Retry again
          </Button>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary