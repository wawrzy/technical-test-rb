// @flow

import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  open: boolean,
  onClose: Function,
  onAction: Function,
  contentText: string,
  content: ?any,
  cancelContent: string,
  actionContent: string,
  title: string,
};

const UModal = ({
  open,
  onClose,
  onAction,
  contentText,
  content,
  cancelContent,
  actionContent,
  title,
}: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {contentText}
      </DialogContentText>
      {content}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        {cancelContent}
      </Button>
      {
         actionContent !== ''
           ? (
             <Button onClick={onAction} color="primary">
               {actionContent}
             </Button>
           ) : null
      }
    </DialogActions>
  </Dialog>
);

export default UModal;
