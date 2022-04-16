import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Article from "../../components/Article";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../NotFound";

const ArticlePage = () => {
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
    if (username && slug) {
      fetch(`/api/views`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, slug }),
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
        })
        .catch((err) => {
          console.error(err);
          // errorFromServerUser({ message: "An unknown error has occurred" });
        });
    }
  }, []);

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
              setVisibility("not-found");
            },
            200: () => {
              setArticle(response.data);
            },
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

  if (loading) return <Loading size="32" />;
  if (visibility === "not-found") return <NotFound />;

  return <Article user={user} article={article} />;
};

export default ArticlePage;
