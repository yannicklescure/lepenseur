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
    visibility: "public",
    createdAt: "0", 
    updatedAt: "0",
    views: 0,
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
    createdAt: "0", 
    updatedAt: "0",
  }
}