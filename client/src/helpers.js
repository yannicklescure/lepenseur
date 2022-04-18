// https://stackoverflow.com/questions/30130241/typeerror-date-is-not-a-constructor
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export const fullWrittenDate = (date, lang = "en-US") => {
  return new window.Date(date).toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
    timeZone: "utc",
  });
};

export const shortWrittenDate = (date, lang = "en-US") => {
  return new window.Date(date).toLocaleDateString(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "utc",
  });
};

export const capitalizeStr = (str) => {
  const left = str.slice(0, 1).toUpperCase();
  const right = str.slice(1, str.length);
  return left + right;
};

// https://gist.github.com/codeguy/6684588?permalink_comment_id=3243980#gistcomment-3243980
export const slugify = (text) => {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

export const readingTime = (text) => {
  const contentString = JSON.stringify(text);
  const words = contentString.split(" ").length;
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute);
};

export const makeTextIntro = (text) => {
  const arr = text.split(/\n/).filter(el => !(new RegExp('[#`]').test(el)) && el.length > 0);
  let result = arr[0];
  if (result.split(' ').length > 50) result = result.split(' ').slice(0, 50).join(' ') + '...';
  // console.log(result);
  return result;
}
