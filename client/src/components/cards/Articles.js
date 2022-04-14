import { NavLink } from "react-router-dom";

const Articles = ({ article }) => {
  return (
    <>
      <NavLink key={article._id} to={`/${article.username}/${article.slug}`}>{article.title}</NavLink>
    </>
  )
}

export default Articles;