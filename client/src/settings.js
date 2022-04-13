export const initialStates = {
  login: {
    email: "",
    password: "",
  },
  signUp: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  story: {
    _id: null,
    slug: "",
    title: "",
    content: "",
    userId: null,
    imageSrc: "undefined",
    visibility: "unlisted",
  },
  user: {
    _id: null,
    firstName: "",
    lastName: "",
    email: "",
    cart: [],
    bookmarks: [],
    ordersHistory: [],
    imageSrc: "undefined",
  }
}