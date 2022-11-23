import { IFunc } from './common'

export interface Props {
  open: boolean;
  message: string | null;
  onClose: IFunc;
}
