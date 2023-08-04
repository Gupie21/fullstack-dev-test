import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import { device } from "../Layout/GlobalStyle";

export const Container = styled.div`
  height: 100%;
  padding-top: 40px;
`;

export const UserBalanceWrapper = styled.div`
  padding-top: 10px;
`


export const UserBalanceAmount = styled.span`
  padding-left: 10px;
  color: green;
`



export const UserCard = styled.div`
  max-width: 400px;
  margin: auto;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: white;
  .avatar-and-name {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 20px;
  }

  .user-fields {
    width: 100%;
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

  @media ${device.mobileL}{
    max-width: 90vw;
  }
`;

export const UserAvatarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 75px;
  object-fit: cover;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  border: 4px solid white;
`;

export const AvatarPhotoButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  position: absolute !important;
  font-size: 22px;
  bottom: 2px;
  right: 5px;
  z-index: 500;
  background: white !important;
  padding: 5px;
`;

export const UserAvatarWrapper = styled.div`
  display: block;
  position: relative;
  height: 100px;
`;

export const StyledPhotoIcon = styled(AddAPhotoIcon)`
  color: ${(props) => props.theme.colors.primary};
`;

export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-row-gap: 8px;
  grid-column-gap: 5px;

  @media ${device.mobileL}{
    grid-row-gap: 5px;
  grid-column-gap: 5px;
    }
`;


export const AvatarImageTile = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: ${props => props.src? `url(${props.src})`: ``};
    margin: auto;
    cursor: pointer; 
    border-radius: 4px;
    ${props => props.isSelected && `transform: scale(1.1);`}
    ${props => props.isSelected && `box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);`}

  transition: 0.1s ease-in-out;
    .overlay{
      ${props => props.isSelected || props.showOverlay? `display: block;` :  `display: none;`}
      border-radius: 4px;
      width: inherit;
      height: inherit;
      position: absolute;
      background: rgba(0, 0, 0, 0.2);
    }
`

export const AvatarDialogActionButton = styled(Button)`
  width: 50%;
  text-transform: initial !important;
`


export const StyledDialogContent = styled(MuiDialogContent)`
    width: 500px;
    height: 400px;
    padding: 16px;

    @media ${device.mobileL}{
      width: 80vw;
    }


`

export const StyledDialogActions = styled(MuiDialogActions)`
    margin: 0;
    display: flex;
    justify-content: space-between;
`



export const StyledDialogTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 12px;

`