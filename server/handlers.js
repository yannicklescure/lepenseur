"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const { readingTime } = require("./helpers");
require("dotenv").config();
const { MONGO_URI, DB_NAME } = process.env;
const mcache = require('memory-cache');

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const user = await db.collection("users").findOne({ username: req.params.username });
    console.log(user);
    
    const { firstName, lastName, username, imageSrc } = user;
    let options = [{visibility: "public"}];
    
    let followers = [];
    let following = [];
    const result = await db.collection("follows").findOne({ userId: user._id });
    if (req.query.user) {
      const member = await db.collection("users").findOne({ _id: req.query.user });
      if (result && member) {
        console.log(result.username);
        if (result.followers) {
          const pos = result.followers.findIndex(el => el.username === member.username);
          if (pos !== -1) options = [{visibility: "public"}, {visibility: "private"}];
        }
      }
    }
    if (result) {
      followers = result.followers;
      following = result.following;
    }
    let stories = await db.collection("stories").find({ username, $or: options }).toArray();
    // console.log(stories);
    stories = stories.sort((a, b) => b.createdAt - a.createdAt);
    let data = { firstName, lastName, username, imageSrc, stories, followers, following };
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
    const data = await db.collection("users").find().toArray();
    console.log(data);
    data
      ? res.status(200).json({ status: 200, data, message: "success" })
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
          likes,
        } = loginAuth;

        let followers = [];
        let following = [];

        const result = await db.collection("follows").findOne({ userId: _id });
        console.log(result);
        if (result) {
          console.log(result._id);
          if (result.following) following = result.following;
          if (result.followers) followers = result.followers;
        }

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
            likes,
            followers,
            following,
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
    ...req.body,
    cart: [],
    bookmarks: [],
    ordersHistory: [],
    imageSrc: "undefined",
    likes: [],
    followers: [],
    following: [],
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
          data: userArray,
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
  const { title, content, userId, imageSrc, visibility, slug, username } =
    req.body;
  const newStory = {
    _id: uuidv4(),
    slug,
    title,
    content,
    userId,
    imageSrc,
    visibility,
    username,
  };
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const test = await db.collection("stories").findOne({
      $and: [{ username }, { slug }],
    });

    if (test) {
      newStory.slug = slug + "-" + uuidv4();
    }

    newStory.tags = [];
    if (req.body.tags) {
      if (req.body.tags.includes(",")) {
        newStory.tags = req.body.tags
          .split(",")
          .map((el) => el.trim())
          .filter((el) => el !== "");
      } else {
        newStory.tags = [req.body.tags];
      }
    }
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
  console.log(req.params);
  console.log(req.query);
  // console.log(req.body);

  const client = new MongoClient(MONGO_URI, option);
  const { _id, title, content, user, imageSrc, visibility, slug } = req.body;

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const story = await db.collection("stories").findOne({ _id });
    // console.log(story);

    if (story) {
      console.log(story.userId === req.query._id);
      console.log("story " + story.userId);
      console.log("current " + req.query._id);
      if (story.userId === req.query._id) {
        let updatedStory = {
          ...story,
          title,
          content,
          imageSrc,
          visibility,
          slug,
          updatedAt: new Date().getTime(),
        };

        if (req.query.delete === "true") {
          updatedStory = {
            ...updatedStory,
            visibility: "unlisted",
            deleted: true,
          };
        }

        console.log(req.body.likes);
        if (req.body.likes) updatedStory.likes = req.body.likes;
        else updatedStory.likes = 0;

        updatedStory.tags = [];
        if (req.body.tags) {
          console.log(req.body.tags);
          if (typeof req.body.tags === "string") {
            if (req.body.tags.includes(",")) {
              updatedStory.tags = req.body.tags
                .split(",")
                .map((el) => el.trim())
                .filter((el) => el !== "");
            } else {
              updatedStory.tags = [req.body.tags];
            }
          } else {
            updatedStory.tags = req.body.tags;
          }
        }

        // console.log(updatedStory);

        const result = await db.collection("stories").updateOne(
          { _id },
          {
            $set: updatedStory,
          }
        );
        // console.log(result);

        if (result) {
          if (updatedStory.deleted)
            res.status(200).json({ status: 200, message: "Story deleted" });
          else
            res
              .status(200)
              .json({ status: 200, data: req.body, message: "Story updated" });
        } else {
          res.status(409).json({ status: 409, message: "ERROR" });
        }
      } else if (req.body.likes >= 0) {
        console.log("like");
        const result = await db.collection("stories").updateOne(
          { _id },
          {
            $set: {
              likes: req.body.likes,
            },
          }
        );
        if (result)
          res
            .status(200)
            .json({ status: 200, data: req.body, message: "Story updated" });
        else res.status(409).json({ status: 409, message: "ERROR" });
      } else {
        res.status(409).json({ status: 409, message: "ERROR" });
      }
    } else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const updateStoryViews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { username, slug } = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const story = await db.collection("stories").findOne({
      $and: [{ username }, { slug }],
    });
    console.log(story);

    if (story) {
      const updatedStory = {};
      updatedStory.views = story.views ? story.views + 1 : 1;
      console.log(updatedStory);

      const result = await db.collection("stories").updateOne(
        { _id: story._id },
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
    } else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getTagStories = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  let key = '__express__' + req.originalUrl || req.url
  let cachedBody = mcache.get(key);
  if (cachedBody) {
    console.log('Sending cached response');
    res.status(200).json({ status: 200, data: cachedBody, message: "success" });
    return
  }
  else {    
    const client = new MongoClient(MONGO_URI, option);
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const result = await db
        .collection("stories")
        .find({
          visibility: "public",
          tags: { $exists: true, $eq: req.params.tagName },
        })
        .toArray();
      // console.log(result);
      console.log(req.params.tagName);
      let data = {};
      if (result) {
        mcache.put(key, data);
        data = result.sort((a, b) => b.createdAt - a.createdAt);
        res.status(200).json({ status: 200, data, message: "success" });
      } else {
        res.status(409).json({ status: 409, message: "Item not found" });
      }
    } catch (err) {
      console.log("Error Getting Items", err);
      res.status(500).json({ status: 500, message: err });
    } finally {
      client.close();
    }
  }
};

const getStory = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  let key = '__express__' + req.originalUrl || req.url
  let cachedBody = mcache.get(key);
  if (cachedBody) {
    console.log('Sending cached response');
    res.status(200).json({ status: 200, data: cachedBody, message: "success" });
    return
  }
  else {
    const client = new MongoClient(MONGO_URI, option);
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const result = await db.collection("stories").findOne({
        $and: [{ username: req.params.username }, { slug: req.params.slug }],
      });
      console.log(result);
      let data = {};
      if (result) {
        const {
          title,
          content,
          imageSrc,
          createdAt,
          updatedAt,
          _id,
          userId,
          slug,
          visibility,
          username,
          tags,
        } = result;
        const views = result.views ? result.views : 1;
        const likes = result.likes ? result.likes : 0;
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
          views,
          tags,
          likes,
        };

        mcache.put(key, data);

        const switchVisibility = {
          unlisted: () => {
            if (
              result.visibility === "unlisted" &&
              req.query._id !== result.userId
            ) {
              data = {};
              return res
                .status(404)
                .json({ status: 404, message: "Item not found" });
            } else {
              return res
                .status(200)
                .json({ status: 200, data, message: "success" });
            }
          },
          private: () => {
            if (
              result.visibility === "unlisted" &&
              req.query._id !== result.userId
            ) {
              data = {};
              return res
                .status(404)
                .json({ status: 404, message: "Item not found" });
            } else {
              return res
                .status(200)
                .json({ status: 200, data, message: "success" });
            }
          },
          public: () => {
            return res
              .status(200)
              .json({ status: 200, data, message: "success" });
          },
        };
        // Increase server response by using an object instead of conditionnal switch/if
        // https://medium.com/@neelesh-arora/stop-using-conditional-statements-everywhere-in-javascript-use-an-object-literal-instead-e780debcda18
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
        switchVisibility[result.visibility]() ??
          res.status(409).json({ status: 409, message: "Item not found" });
      } else {
        res.status(409).json({ status: 409, message: "Item not found" });
      }
    } catch (err) {
      console.log("Error Getting Items", err);
      res.status(500).json({ status: 500, message: err });
    } finally {
      client.close();
    }
  }
};

const getArticles = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  let key = '__express__' + req.originalUrl || req.url
  let cachedBody = mcache.get(key);
  if (cachedBody) {
    console.log('Sending cached response');
    res.status(200).json({ status: 200, data: cachedBody, message: "success" });
    return
  }
  else {
    const client = new MongoClient(MONGO_URI, option);
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      let data = await db
        .collection("stories")
        .find({ visibility: "public" })
        .toArray();
      data = data
        .filter((el) => !el.deleted)
        .sort((a, b) => b.createdAt - a.createdAt);
      console.log(data.length + " items");
      const arr = [];

      mcache.put(key, data);
  
      res.status(200).json({ status: 200, data, message: "success" });
    } catch (err) {
      console.log("Error", err);
      res.status(500).json({ status: 500, message: err });
    } finally {
      client.close();
    }
  }
};

const getUserStories = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  let key = '__express__' + req.originalUrl || req.url
  let cachedBody = mcache.get(key);
  if (cachedBody) {
    console.log('Sending cached response');
    res.status(200).json({ status: 200, data: cachedBody, message: "success" });
    return
  }
  else {    
    const client = new MongoClient(MONGO_URI, option);
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const userId = req.query._id;
      if (userId) {
        let data = await db.collection("stories").find({ userId }).toArray();
        data = data
          .filter((el) => !el.deleted)
          .sort((a, b) => b.createdAt - a.createdAt);
        console.log(data.length + " items");
        const arr = [];
  
        mcache.put(key, data);
        res.status(200).json({ status: 200, data, message: "success" });
      } else {
        res.status(404).json({ status: 404, message: "Item not found" });
      }
    } catch (err) {
      console.log("Error", err);
      res.status(500).json({ status: 500, message: err });
    } finally {
      client.close();
    }
  }
};

const updateComments = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  const client = new MongoClient(MONGO_URI, option);
  const { articleId, comment } = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const result = await db.collection("comments").findOne({ articleId });
    console.log(result);

    if (result) {
      const data = result;
      data.comments.push({
        _id: uuidv4(),
        ...comment
      });
      console.log(data);

      const update = await db.collection("comments").updateOne(
        { _id: result._id },
        {
          $set: data,
        }
      );
      console.log(update);
      update
        ? res.status(200).json({
            status: 200,
            data,
            message: "Comment added",
          })
        : res.status(409).json({ status: 409, message: "ERROR" });
    } else {
      const data = {
        _id: uuidv4(),
        articleId,
        comments: [{
          _id: uuidv4(),
          ...comment
        }],
      };
      const result = await db.collection("comments").insertOne(data);
      res.status(200).json({
        status: 200,
        data,
        message: "Comment added",
      });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getComments = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const articleId = req.query.article;
    let data = await db.collection("comments").findOne({ articleId });      
    res.status(200).json({ status: 200, data: data ? data : {
      articleId,
      comments: []
    }, message: "success" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getTrending = async (req, res) => {
  console.log(req.params);

  let key = '__express__' + req.originalUrl || req.url
  let cachedBody = mcache.get(key);
  if (cachedBody) {
    res.status(200).json({ status: 200, data: cachedBody, message: "success" });
    return
  }
  else {
    const client = new MongoClient(MONGO_URI, option);
    try {
      console.log("connecting to db");
      await client.connect();
      console.log("connected to db");
      const db = client.db(DB_NAME);
      console.log("requesting stories array");
      let stories = await db
        .collection("stories")
        .find({ visibility: "public" })
        .project({
          title: 1,
          slug: 1,
          username: 1,
          views: 1,
          createdAt: 1,
          content: 1,
          tags: 1,
        })
        .toArray();
      console.log("received stories array");
      // console.log(stories);
      if (stories) {
        const data = stories
          .map((story) => {
            const { _id, title, slug, username, createdAt, content, tags } =
              story;
            const tmp = story;
            const time = readingTime(content);
            let views = 1;
            if (story.views) views = story.views;
            return {
              _id,
              title,
              slug,
              username,
              createdAt,
              readingTime: time,
              views,
              tags,
            };
          })
          .sort((a, b) => b.views - a.views)
          .slice(0, 6);
        
        mcache.put(key, data);
        res.status(200).json({ status: 200, data, message: "success" });
      } else {
        res.status(409).json({ status: 404, message: "Items not found" });
      }
    } catch (err) {
      console.log("Error Getting Items", err);
      res.status(500).json({ status: 500, message: err });
    } finally {
      client.close();
    }
  }
};

const getBookmarks = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  let keys = [];
  if (typeof req.query.b === 'string') {
    keys = [req.query.b];
  }
  else {
    keys = req.query.b;
  }

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    let data = await db
      .collection("stories")
      .find({ _id: { $in: keys } })
      .toArray();
    data = data
      .filter((el) => !el.deleted)
      .sort((a, b) => b.createdAt - a.createdAt);
    console.log(data.length + " items");
    const arr = [];

    res.status(200).json({ status: 200, data, message: "success" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const updateFollow = async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  const client = new MongoClient(MONGO_URI, option);
  const { userId, writer } = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const following = await db.collection("users").findOne({ _id: userId });
    console.log(following._id);
    const { firstName, lastName, username } = following;
    // FOLLOWERS
    const member = await db.collection("users").findOne({ username: writer.username });
    console.log(member._id);
    const result2 = await db.collection("follows").findOne({ userId: member._id });
    console.log(result2);

    if (result2) {
      const data = result2;
      let message = "Follower added";
      if (data.followers) {
        const pos = data.followers.findIndex(el => el.username === following.username);
        if (pos === -1) {
          data.followers.push({
            _id: uuidv4(),
            firstName,
            lastName,
            username,
            createdAt: new Date().getTime(),
          });
        }
        else {
          data.followers.splice(pos, 1);
          message = "Follower removed";
        }
        console.log(data);
      }
      else {
        data.followers = [];
      }

      const update = await db.collection("follows").updateOne(
        { _id: result2._id },
        {
          $set: data,
        }
      );
      console.log(update);
    } else {
      const data = {
        _id: uuidv4(),
        userId: member._id,
        followers: [{
          _id: uuidv4(),
          firstName,
          lastName,
          username,
          createdAt: new Date().getTime(),
        }],
      };
      const result = await db.collection("follows").insertOne(data);
    }

    // FOLLOWING
    const result = await db.collection("follows").findOne({ userId });
    console.log(result);

    if (result) {
      const data = result;
      let message = "Following added";
      if (data.following) {
        const pos = data.following.findIndex(el => el.username === writer.username);
        if (pos === -1) {
          data.following.push({
            _id: uuidv4(),
            ...writer
          });
        }
        else {
          data.following.splice(pos, 1);
          message = "Following removed";
        }
        console.log(data);
      }
      else {
        data.following = [];
      }

      const update = await db.collection("follows").updateOne(
        { _id: result._id },
        {
          $set: data,
        }
      );
      console.log(update);
      update
        ? res.status(200).json({
            status: 200,
            data,
            message,
          })
        : res.status(409).json({ status: 409, message: "ERROR" });
    } else {
      const data = {
        _id: uuidv4(),
        userId,
        following: [{
          _id: uuidv4(),
          ...writer
        }],
      };
      const result = await db.collection("follows").insertOne(data);
      res.status(200).json({
        status: 200,
        data,
        message: "Following created",
      });
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
  getUserStories,
  updateStory,
  updateStoryViews,
  getTagStories,
  getTrending,
  getArticles,
  getBookmarks,
  getComments,
  updateComments,
  updateFollow,
  // updateCart,
  // updateBookmarks,
  // updateOrdersHistory,
};
