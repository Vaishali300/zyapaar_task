import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
const useStyles = styled((theme) => ({
  dialogRoot: {
    position: "relative",
  },
  dialogTitleRoot: {
    "& .MuiTypography-h6": {
      fontSize: 16,
      color: theme.palette.common.dark,
      textOverflow: "ellipsis",
      maxWidth: "350px",
      display: "block",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  },
  dialogActionsRoot: {
    padding: "16px 24px",
    align: "center",
  },
}));

const ConfirmDltDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  btnLabels,
  content1,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      className={classes.dialogRoot}
    >
      <DialogContent
        style={{
          width: "380px",
          padding: "80px 0px 60px",
          textAlign: "center",
        }}
      >
        <DialogContentText
          style={{
            maxWidth: "266px",
            margin: "0 auto 10px",
            fontSize: "16px",
            color: "rgb(113, 117, 125)",
            letterSpacing: "0",
            lineHeight: "1.3",
          }}
        >
          {content}
        </DialogContentText>
        <DialogContentText
          style={{
            maxWidth: "266px",
            margin: "0 auto 30px",
            fontSize: "16px",
            color: "rgb(113, 117, 125)",
            letterSpacing: "0",
            lineHeight: "1.3",
          }}
        >
          {content1}
        </DialogContentText>
        <DialogActions style={{ justifyContent: "space-around" }}>
          {btnLabels.no && (
            <Button
              onClick={onClose}
              style={{
                minWidth: "133px",
                minHeight: "49px",
                fontSize: "16px",
                letterSpacing: "0",
              }}
              variant="contained"
            >
              {" "}
              {btnLabels.no}
            </Button>
          )}
          <Button
            onClick={onConfirm}
            style={{
              minWidth: "133px",
              minHeight: "49px",
              marginLeft: "0",
              fontSize: "16px",
              letterSpacing: "0",
            }}
            variant="contained"
          >
            {" "}
            {btnLabels.Yes}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ConfirmDltDialog.defaultProps = {
  open: false,
  title: "Confirm Delete",
  btnLabels: {
    confirm: "Confirm",
  },
};

export default React.memo(ConfirmDltDialog);
