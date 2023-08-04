import React, { useContext } from "react";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AuthUserContext from "../../Providers/AuthContext";

const StyledAppBar = styled(AppBar)`
    background: ${props => props.theme.colors.primary} !important;
`;

const HeaderTitle = styled.div``;

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

function AuthHeader({ title }) {
  const { handleSignOut } = useContext(AuthUserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOutClick = () => {
    setAnchorEl(null);
    handleSignOut();
  };

  return (
    <StyledAppBar position="static">
      <StyledToolBar>
        <div></div>

        {title ? <HeaderTitle>{title}</HeaderTitle> : null}

        <IconButton
          onClick={handleMenu}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </StyledToolBar>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSignOutClick()}>Logout</MenuItem>
      </Menu>
    </StyledAppBar>
  );
}

export default AuthHeader;
