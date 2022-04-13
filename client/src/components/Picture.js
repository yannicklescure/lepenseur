import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { StoryContext } from "../contexts/StoryContext";
import { UserContext } from "../contexts/UserContext";
import imageCompression from 'browser-image-compression';
import Loading from "./Loading/Loading";
import { MIN_CHAR } from "../constants";

// code inspired from 
// https://stackoverflow.com/questions/36580196/reactjs-base64-file-upload

const Picture = ({ from }) => {
  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);

  const {
    state: { story },
    actions: { initialStory, readyToPublish, updateStory },
  } = useContext(StoryContext);

  const [imageSrc, setImageSrc] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let imgSrc = undefined;
    if (from === 'story') imgSrc = story.imageSrc;
    if (from === 'user') imgSrc = user.imageSrc;
    setImageSrc(imgSrc);
  }, [])

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    setLoading(true);
    setImageSrc(undefined);
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    try {
      let base64 = await convertBase64(imageFile);

      if (base64.length >= 5200000) {
        // https://github.com/Donaldcwl/browser-image-compression
        const compressedFile = await imageCompression(imageFile, options);
        // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        base64 = await convertBase64(compressedFile);
        // console.log(base64.length);
      }
      setImageSrc(base64);
      setLoading(false);
      if (from === 'story') {
        const data = story;
        data.imageSrc = base64;
        if (data.content.length > MIN_CHAR && data.title.length > MIN_CHAR && data.imageSrc !== "undefined") {
          readyToPublish({ story: data });
        }
        else if (data.content.length > MIN_CHAR || data.title.length > MIN_CHAR) {
          updateStory({ story: data });
        }
        else {
          initialStory();
        }
      }
      if (from === 'user') {
        const data = user;
        data.imageSrc = base64;
        updateUser({ user: data });
        fetch(`/api/users`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper>
        <label htmlFor="avatar">Choose picture to upload</label>
        <StyledInput
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg, image/webp"
          onChange={(ev) => handleFileRead(ev)}
        />
        {loading && <Loading size="32" />}
        {imageSrc !== "undefined" && <StyledImg src={imageSrc} />}
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  margin-bottom: 16px;
`;
const StyledInput = styled.input`
  font-size: 16px;
  height: 34px;
  padding: 8px 12px;
  border: none;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 16px;
`;
const StyledImg = styled.img`
  width: 100%;
`;

export default Picture;