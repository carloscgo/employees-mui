import Alert from '@mui/material/Alert';

import { PropsError } from '../../utils/interfaces';

const Error = ({ message }: PropsError) => {
  return (
    <Alert severity="error">
      {message}
    </Alert>
  )
}

export default Error;
