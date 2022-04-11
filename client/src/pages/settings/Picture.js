import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const Picture = () => {
  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);

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
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    // console.log(base64);
    const userCopy = user;
    userCopy.imageSrc = base64;
    updateUser({ user: userCopy });
    fetch(`/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCopy),
    })
      // .then((res) => {
      //   return res.json();
      // })
      // .then((data) => {
      //   console.log(data);
      // })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <label htmlFor="avatar">Choose file to upload</label>
        <StyledInput
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={(ev) => handleFileRead(ev)}
        />
      </div>
    </>
  )
}

const StyledInput = styled.input`
  font-size: 16px;
  height: 34px;
  padding: 8px 12px;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

export default Picture;