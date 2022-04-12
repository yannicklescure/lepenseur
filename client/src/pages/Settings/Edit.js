import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Picture from "../../components/Picture";

const Edit = () => {
  const {
    state: { user },
    actions: { logoutUser },
  } = useContext(UserContext);

  return (
    <>
      <Picture />
    </>
  )
}

export default Edit;