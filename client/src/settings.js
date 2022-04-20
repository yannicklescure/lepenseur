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
    createdAt: 0,
    updatedAt: 0,
    views: 0,
    tags: [],
  },
  user: {
    _id: null,
    firstName: "",
    lastName: "",
    email: "",
    cart: [],
    bookmarks: [],
    likes: [],
    ordersHistory: [],
    imageSrc: "undefined",
    createdAt: 0,
    updatedAt: 0,
    following: [],
    followers: [],
  },
  trending: [],
  comments: {
    articleId: '',
    comments: [],
  },
  comment: {
    articleId: '',
    comment: {
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      content: '',
      createdAt: 0,
    }
  }
};
