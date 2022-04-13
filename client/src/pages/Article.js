import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Article = () => {
  const params = useParams();
  // console.log(params);
  const { username, slug } = params;
  
  const {
    state: { user },
  } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    let fetchUrl = `/api/stories/${username}/${slug}`;
    if (user._id) fetchUrl += `?_id=${user._id}`;
    console.log(fetchUrl);
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        // setUser(response.data);
        // setLoading(false);
      });
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>Article</div>
  )
}

export default Article;