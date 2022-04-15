import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../NotFound";
import Form from "../../components/Stories/Form";
import Picture from "../../components/Picture";
import Select from "../../components/Stories/Select";

const ArticleEdit = () => {
  const params = useParams();
  // console.log(params);
  const { username, slug } = params;

  const [visibility, setVisibility] = useState(undefined);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  
  const {
    state: { user },
  } = useContext(UserContext);
  // console.log(user);

  useEffect(() => {
    let unmounted = false;
    let fetchUrl = `/api/stories/${username}/${slug}`;
    if (user._id) fetchUrl += `?_id=${user._id}`;
    // console.log(fetchUrl);
    fetch(fetchUrl)
      .then((res) => {
        if (!unmounted) return res.json();
      })
      .then((response) => {
        if (!unmounted) {
          // console.log(response);
          const status = {
            404: () => {
              setVisibility('not-found');
            },
            200: () => {
              setArticle(response.data);
            }
          };
          status[response.status]();
          // setUser(response.data);
          setLoading(false);
        }
      });
      
      return () => {
        unmounted = true;
      };
  // eslint-disable-next-line
  }, [user, username, slug]);

  if (loading) return <Loading />;
  if (visibility === 'not-found') return <NotFound />;

  return (
    <>
      <Select from="editStory" article={article} />
      <Picture from="editStory" article={article} />
      <Form from="editStory" article={article} />
    </>
  )
}

export default ArticleEdit;