import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import styled from "styled-components";
import PropTypes from "prop-types";
import { device } from "../Layout/GlobalStyle";

const StyledAction = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  justify-content: flex-end;

  .message-cta-wrapper {
    padding-right: 20px;
    padding-left: 20px;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: inherit;

    .message {
      padding-right: 20px;
      text-align: left;
      color: white;
      font-size: 16px;
    }

    @media ${device.mobileL} {
      flex-direction: column;
      padding: 0px;

      .message {
        font-size: 13px;
        padding-right: 0px;
      }

      width: 100%;
    }
  }

  @media ${device.mobileL} {
    height: 70px;

    width: 100%;
  }
`;

const StyledSnackBar = styled(Snackbar)`
  padding: 0px;
  bottom: 0px;
  left: 0px;

  .MuiSnackbarContent-root {
    width: 100%;
    padding: 0px;
    bottom: 0px;
    left: 0px;
  }

  .MuiSnackbarContent-action {
    margin-right: 0px;
    padding-left: 0px;
    margin-left: 0px;
    width: 100%;
    padding: 15px;
  }

  @media ${device.mobileL} {
    padding: 10px;
  }
`;

const SubmitButton = styled(Button)`
  color: white !important;
  min-width: 150px !important;
  background: ${(props) => props.theme.colors.primary} !important;

  @media ${device.mobileL} {
    width: 90%;
  }
`;

function MaterialSnackbarSubmit({
  open,
  setOpen,
  severity,
  submitText,
  submittingText,
  submitting,
  message,
  callback,
  position: { horizontal, vertical },
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <StyledSnackBar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      key={vertical + horizontal}
      onClose={handleClose}
      action={
        <StyledAction submitting={submitting}>
          <div className="message-cta-wrapper">
            <div className={"message"}>
              {submitting ? submittingText : message}
            </div>

            {!submitting && (
              <SubmitButton onClick={() => callback()}>
                {submitText}{" "}
              </SubmitButton>
            )}
          </div>
        </StyledAction>
      }
    />
  );
}

MaterialSnackbarSubmit.defaultProps = {
  open: false,
  message: "this is message",
  submitText: "Submit",
  submittingText: "Submitting",
  submitting: false,
  callback: () =>
    console.log(
      "no property called callback has been passed down to MaterialSnackbarSubmit.js"
    ),
  position: {
    vertical: "bottom",
    horizontal: "right",
  },
};

MaterialSnackbarSubmit.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitText: PropTypes.string.isRequired,
  submittingText: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  position: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
};

export default MaterialSnackbarSubmit;
