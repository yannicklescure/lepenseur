import { useContext } from "react";
import Banner from "../components/Banner";
import Trending from "../components/Trending";
import PublicArticles from "../components/PublicArticles";
import { UserContext } from "../contexts/UserContext";

const Homepage = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <>
      { !user._id && <Banner /> }
      <Trending />
      <PublicArticles />
    </>
  )
}

export default Homepage;