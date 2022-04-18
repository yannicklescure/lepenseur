import { useContext } from "react";
import Banner from "../components/Banner";
import Trending from "../components/Trending";
import { UserContext } from "../contexts/UserContext";

const Homepage = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <>
      { !user._id && <Banner /> }
      <Trending />
    </>
  )
}

export default Homepage;