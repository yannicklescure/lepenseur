import { useParams } from "react-router-dom";

const UserPage = () => {
  const params = useParams()
  const userName = params.username;

  return (
    <div>user: {userName}</div>
  )
}

export default UserPage;