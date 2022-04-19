import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Article from "../components/cards/Article";
import Loading from "../components/Loading";

const Bookmarks = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.bookmarks.length > 0) {
      let options = "";
      user.bookmarks.forEach((_id, index) => {
        options += "b=" + _id + "&";
      });
      fetch(`/api/bookmarks?${options}`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response.data);
          setBookmarks(response.data);
          setLoading(false);
        });
    }
    else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading size="32" />;

  if (bookmarks.length === 0) return <>No bookmarks</>

  return (
    <>
      {bookmarks.map((bookmark) => (
        <div key={bookmark._id}>
          <Article article={bookmark} />
        </div>
      ))}
    </>
  );
};

export default Bookmarks;
