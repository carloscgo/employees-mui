import { useState, useEffect } from 'react';
import { Snackbar, AlertTitle } from '@mui/material';
import Alert from '../Alert';

import { PropsToast } from "../../utils/interfaces";

const Toast = ({ open, message, onClose }: PropsToast) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open)
  }, [open])

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={show} onClose={onClose}>
      <Alert onClose={onClose} severity="success" variant="outlined" sx={{ width: '100%' }}>
        <AlertTitle><>Success</></AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast