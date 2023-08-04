import React, { useRef, useState, useContext, useEffect } from "react";
import {
  StyledDialogTitle,
  AvatarDialogActionButton,
  StyledDialogContent,
  StyledDialogActions,
  UserAvatarImage,
  UserAvatarWrapper,
  AvatarPhotoButton,
  StyledPhotoIcon,
  AvatarImageTile,
  AvatarGrid,
} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Compressor from "compressorjs";
import blobToBase64 from "blob-to-base64";
import { theme } from "../Layout/GlobalStyle";
import {
  updateUserPicture,
  getUserPictureByUserID,
} from "../../services/user.services";
import AuthUserContext from "../Providers/AuthContext";
import Dialog from '@mui/material/Dialog';
import SubmittingBackdrop from "../common/SubmittingBackdrop";

function UserAvatar() {
  const { user } = useContext(AuthUserContext);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const pictureRef = useRef(null);
  const [currentPicture, setCurrentPicture] = useState("");
  const [tempPicture, setTempPicture] = useState("");
  const [dialogOpened, setDialogOpened] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && user._id) {
      loadAvatar(isSubscribed);
    }

    return () => (isSubscribed = false);
  }, [user._id]);

  const loadAvatar = (isSubscribed) => {
    getUserPictureByUserID(user._id)
      .then((res) => {
        if (res.status >= 200 && isSubscribed) {
          setCurrentPicture(res.data);
        }
      })
      .catch((err) => {
        setErrors(err.response.data);
        throw err;
      });
  };

  const handlePicture = (event) => {
    new Compressor(event.target.files[0], {
      convertSize: 150,
      success(result) {
        blobToBase64(result, function (error, base64) {
          let item = base64;
          setTempPicture(item);
        });
      },
      error(err) {
        console.error(err.toString());
      },
    });
  };

  const onSubmit = () => {
    setSubmitting(true);
    updateUserPicture({ userid: user._id, picture: tempPicture })
      .then((res) => {
        if (res.status >= 200) {
          setTimeout(() => {
            loadAvatar(true);
            setSubmitting(false);
          }, 500);
      
        }
      })
      .catch((err) => {
        setSubmitting(false);
        throw err;
      });
  };

  const renderAvatars = theme.avatars.map((ava, index) => {
    return (
      <AvatarImageTile
        isSelected={ava === tempPicture}
        key={index}
        onClick={() => setTempPicture(ava)}
        src={ava}
      >
        <div className="overlay"></div>
      </AvatarImageTile>
    );
  });

  return (
    <>
    {submitting && <SubmittingBackdrop />}
      <Dialog onClose={() => setDialogOpened(false)} open={dialogOpened}>
        <StyledDialogTitle>
          <Typography>Select or upload a picture</Typography>
          <IconButton onClick={() => setDialogOpened(false)}>
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>

        <StyledDialogContent>
          <input
            ref={pictureRef}
            hidden
            type="file"
            onChange={(e) => handlePicture(e)}
          />
          <AvatarGrid>
            <AvatarImageTile
              onClick={() => pictureRef.current.click()}
              src={!theme.avatars.includes(tempPicture) ? tempPicture : ""}
              showOverlay={true}
            >
              <IconButton>
                <StyledPhotoIcon />
              </IconButton>
            </AvatarImageTile>
            {renderAvatars}
          </AvatarGrid>
        </StyledDialogContent>
        <StyledDialogActions>
          <AvatarDialogActionButton onClick={() => setDialogOpened(false)}>
            Cancel
          </AvatarDialogActionButton>
          <AvatarDialogActionButton
            disabled={!tempPicture || submitting}
            onClick={() => onSubmit()}
          >
            Save chang{submitting ? "ing" : "es"}
          </AvatarDialogActionButton>
        </StyledDialogActions>
      </Dialog>
      <UserAvatarWrapper>
        <UserAvatarImage src={currentPicture} />
        <AvatarPhotoButton onClick={() => setDialogOpened(true)}>
          <StyledPhotoIcon />
        </AvatarPhotoButton>
      </UserAvatarWrapper>
      </>
  );
}

export default UserAvatar;
