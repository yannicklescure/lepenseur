"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DB_NAME } = process.env;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  console.log(req.params);

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const user = await db.collection("users").findOne({ username: req.params.username });
    console.log(user);
    const { firstName, lastName, username, imageSrc } = user;
    const stories = await db.collection("stories").find({ username, visibility: 'public' }).toArray();
    console.log(stories);
    let data = { firstName, lastName, username, imageSrc, stories };

    user
      ? res.status(200).json({ status: 200, data, message: "success" })
      : res.status(409).json({ status: 409, message: "Item not found" });
  } catch (err) {
    console.log("Error Getting Items", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const result = await db.collection("users").find().toArray();
    console.log(result);
    result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error getting list of users", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const updateUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { _id } = req.body;
  const data = req.body;
  console.log(data);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const user = await db.collection("users").findOne({ _id });

    console.log(user);
    if (user) {
      const result = await db.collection("users").updateOne(
        { _id },
        {
          $set: data,
        }
      );

      console.log(result);
      return res.status(200).json({
        status: 200,
        message: `User updated`,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add Cart to database, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const loginUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "Add your email and password" });
    }
    const loginAuth = await db.collection("users").findOne({ email });
    if (loginAuth) {
      const loginPassword = await bcrypt.compare(password, loginAuth.password);
      if (loginPassword) {
        const {
          firstName,
          lastName,
          username,
          email,
          _id,
          cart,
          bookmarks,
          ordersHistory,
          imageSrc,
        } = loginAuth;

        return res.status(200).json({
          status: 200,
          message: "User Logged In",
          data: {
            firstName,
            lastName,
            username,
            email,
            _id,
            cart,
            bookmarks,
            ordersHistory,
            imageSrc,
          },
        });
      } else
        return res
          .status(400)
          .json({ status: 400, message: "Passwords don't match" });
    } else
      return res.status(400).json({ status: 400, message: "E-mail not found" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { firstName, lastName, email, password } = req.body;
  const userArray = {
    _id: uuidv4(),
    firstName,
    lastName,
    email,
    password,
    cart: [],
    bookmarks: [],
    ordersHistory: [],
    imageSrc: "undefined",
  };
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const user = await db.collection("users").findOne({ email });
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValidation.test(email)) {
      return res
        .status(400)
        .json({ status: 400, message: "E-mail isn't valid" });
    }
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(409)
        .json({ status: 409, message: "Add your credentials" });
    }
    if (user) {
      return res
        .status(400)
        .json({ status: 400, message: "User already exists" });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    userArray.password = cryptedPassword;
    // https://stackoverflow.com/questions/4537227/javascript-replace-special-chars-with-empty-strings
    userArray.username = `${firstName}${lastName}`
      .toLowerCase()
      .replace(/[^a-zA-Z 0-9]+/g, "");
    const result = await db.collection("users").insertOne(userArray);
    result
      ? res.status(200).json({
          status: 200,
          data: {
            firstName,
            lastName,
            email,
            _id: userArray._id,
            cart: userArray.cart,
            bookmarks: userArray.bookmarks,
            ordersHistory: userArray.ordersHistory,
            imageSrc: "undefined",
          },
          message: "User Created",
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const createStory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { title, content, userId, imageSrc, visibility, slug, username } = req.body;
  const newStory = {
    _id: uuidv4(),
    slug,
    title,
    content,
    userId,
    imageSrc,
    visibility,
    username
  };
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    newStory.createdAt = new Date().getTime();
    newStory.updatedAt = new Date().getTime();
    const result = await db.collection("stories").insertOne(newStory);

    result
      ? res.status(200).json({
          status: 200,
          data: newStory,
          message: "Story created",
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const updateStory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { _id, title, content, userId, imageSrc, visibility, slug, username } = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const story = await db.collection("stories").findOne({ _id });
    console.log(story);

    if (story) {
      // const updatedStory = {
      //   ...story,
      //   title, 
      //   content, 
      //   user,
      //   imageSrc, 
      //   visibility, 
      //   slug, 
      //   updatedAt: new Date().getTime()
      // };
      // Rather than sending the full object, I just send the updated data.
      const updatedStory = {};
      if (story.slug !== slug) updatedStory.slug = slug;
      if (story.title !== title) updatedStory.title = title;
      if (story.content !== content) updatedStory.content = content;
      if (story.userId !== userId) updatedStory.userId = userId;
      if (story.imageSrc !== imageSrc) updatedStory.imageSrc = imageSrc;
      if (story.visibility !== visibility) updatedStory.visibility = visibility;
      if (story.username !== username) updatedStory.username = username;
      updatedStory.updatedAt = new Date().getTime();
      console.log(updatedStory);

      const result = await db.collection("stories").updateOne(
        { _id },
        {
          $set: updatedStory,
        }
      );
      console.log(result);
      result
        ? res.status(200).json({
            status: 200,
            data: updatedStory,
            message: "Story updated",
          })
        : res.status(409).json({ status: 409, message: "ERROR" });
    }
    else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }
    
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getStory = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const result = await db.collection("stories").findOne({
      $and : [
        { username: req.params.username }, { slug: req.params.slug }
      ]
    });
    // console.log(result);
    let data = {};
    if (result) {
      const { title, content, imageSrc, createdAt, updatedAt, _id, userId, slug, visibility, username } = result;
      const user = await db.collection("users").findOne({ _id: userId });
      data = {
        _id,
        content,
        createdAt,
        imageSrc,
        title,
        updatedAt,
        user: {
          _id: userId,
          firstName: user.firstName,
          lastName: user.lastName,
          imageSrc: user.imageSrc,
          username,
        },
        slug,
        visibility,
      };
      const switchVisibility = {
        unlisted: () => {
          if (result.visibility === 'unlisted' && req.query._id !== result.userId) {
            data = {};
            return res.status(404).json({ status: 404, message: "Item not found" });
          }
          else {
            return res.status(200).json({ status: 200, data, message: "success" });
          }
        },
        private: () => {
          if (result.visibility === 'unlisted' && req.query._id !== result.userId) {
            data = {};
            return res.status(404).json({ status: 404, message: "Item not found" });
          }
          else {
            return res.status(200).json({ status: 200, data, message: "success" });
          }
        },
        public: () => {
          return res.status(200).json({ status: 200, data, message: "success" });
        }
      }
      // Increase server response by using an object instead of conditionnal switch/if
      // https://medium.com/@neelesh-arora/stop-using-conditional-statements-everywhere-in-javascript-use-an-object-literal-instead-e780debcda18
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
      switchVisibility[result.visibility]() ?? res.status(409).json({ status: 409, message: "Item not found" });
    }
    else {
      res.status(409).json({ status: 409, message: "Item not found" });
    }
  } catch (err) {
    console.log("Error Getting Items", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getStories = async (req, res) => {
  const { username } = req.params;
  console.log(req.params);
  console.log(req.query);

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const userId = req.query._id;
    const data = await db.collection("stories").find({ userId }).toArray();
    if (data.length > 0) {      
      res.status(200).json({ status: 200, data, message: "success" });
    }
    else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  loginUser,
  updateUser,
  createStory,
  getStory,
  getStories,
  updateStory,
  // updateCart,
  // updateBookmarks,
  // updateOrdersHistory,
};
