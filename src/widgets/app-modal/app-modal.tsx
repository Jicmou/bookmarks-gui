import * as React from 'react';
import Modal from '@material-ui/core/Modal';

export interface IAppModalProps {
  message: string;
  onAppModalClose: () => void;
  open: boolean;
}

export const AppModal = (props: IAppModalProps) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    className="modal"
    open={props.open}
    onClose={props.onAppModalClose}
  >
    <div className="modal-content" id="simple-modal-descriptio">
      {props.message}
    </div>
  </Modal>
);
