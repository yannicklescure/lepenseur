import Navigation from "../components/Navigation";
import Trending from "../components/Trending";

const Homepage = () => {
  const title = 'Homepage';

  return (
    <>
      <Navigation title={title} />
      <Trending />
    </>
  )
}

export default Homepage;