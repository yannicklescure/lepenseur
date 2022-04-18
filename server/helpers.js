// https://gist.github.com/codeguy/6684588?permalink_comment_id=3243980#gistcomment-3243980
const slugify = (text) => {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const readingTime = (text) => {
  const contentString = JSON.stringify(text);
  const words = contentString.split(" ").length;
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute);
};

module.exports = {
  slugify,
  readingTime,
}
