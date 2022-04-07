// https://stackoverflow.com/questions/30130241/typeerror-date-is-not-a-constructor
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export const fullWrittenDate = (date, lang = 'en-US') => {
  return new window.Date(date).toLocaleDateString(
    lang,
    {
      year: 'numeric',
      month: 'long',
      weekday: 'long',
      day: 'numeric',
      timeZone: 'utc'
    }
  );
}
