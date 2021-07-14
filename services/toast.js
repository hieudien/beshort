import { toast } from 'react-toastify';
const toastOption = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 1500,
  closeButton: true,
  hideProgressBar: true,
}

export const toastInfo = (message) => {
  toast.success(message, toastOption)
}
export const toastError = (message) => {
  toast.warn(message, {...toastOption, autoClose: 2000})
}