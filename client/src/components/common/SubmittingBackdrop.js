import React from "react";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const StyledBackdrop = styled(Backdrop)`
  z-index: 10000 !important;
  color: white;
`;

function SubmittingBackdrop() {
  return (
    <StyledBackdrop open={true}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}

export default SubmittingBackdrop;
