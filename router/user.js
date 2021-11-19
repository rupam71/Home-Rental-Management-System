const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/user");
const upload = require("../upload");
const sharp = require("sharp");

module.exports = (app) => {
  // sign up //DONE
  app.post("/api/users/signup", async (req, res) => {
    const user = new User(req.body);
    try {
      const token = await user.generateAuthToken();
      await user.save();

      res.status(201).send({ user, token });
    } catch (e) {
      if (e.code) {
        res.status(400).send("Email Already Used");
      } else {
        res.status(400).send(Object.entries(e.errors)[0][1].message);
      }
    }
  });

  //login //DONE
  app.post("/api/users/login", async (req, res) => {
    try {
      const user = await User.findByCredential(
        req.body.email,
        req.body.password
      );

      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  //Edit user //DONE
  app.patch("/api/users/edit", auth, async (req, res) => {
    if (req.body.email) return res.status(400).send("email change not allowed");

    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { ...req.body },
        { new: true }
      );
      if (!user)
        return res.status(404).send("The User With Given ID Not Found");
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(400).send(Object.entries(e.errors)[0][1].message);
    }
  });

  //Delete me //DONE
  app.delete("/api/users/remove", auth, async (req, res) => {
    try {
      await req.user.remove();
      res.send(req.user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //Delete by id //Admin only
  app.delete("/api/users/remove/:id", admin, async (req, res) => {
    const _id = req.params.id;

    try {
      const user = await User.findById(_id);
      if (!user) return res.status(404).send("User Not Found");

      await user.remove();
      res.send(user);
    } catch (e) {
      if (e.kind === "ObjectId") res.status(400).send("Invalid Id");
      else res.status(400).send(e);
    }
  });

  //logout from device //DONE
  app.post("/api/users/logout", auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.send("Logout From This Device");
    } catch (e) {
      res.status(500).send();
    }
  });

  // logout from all device //DONE
  app.post("/api/users/logoutAll", auth, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send("Logout From All Device");
    } catch (e) {
      res.status(500).send();
    }
  });

  //show all user
  app.get("/api/users/showAllUser", auth, async (req, res) => {
    const user = await User.find({ userType: "normal" });

    try {
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //show you //DONE
  app.get("/api/users/me", auth, async (req, res) => {
    res.send(req.user);
  });

  //user by id //DONE
  app.get("/api/users/:id", async (req, res) => {
    const _id = req.params.id;

    try {
      const users = await User.findById(_id);
      if (!users) return res.status(404).send("User Not Found");

      res.send(users);
    } catch (e) {
      if (e.kind === "ObjectId") res.status(400).send("Invalid Id");
      else res.status(400).send(e);
    }
  });

  //Upload Profile Picture //DONE
  app.post("/api/users/me/upload", auth, upload.single("profilePicture"), async (req, res) => {
      try {
        const buffer = await sharp(req.file.buffer)
          .png()
          .toBuffer();
        req.user.profilePicture = buffer;
        await req.user.save();
        
        res.send(req.user);
      } catch (e) {
        res.status(400).send(e.message);
      }
    }
  );

  //Get Profile Picture //DONE
  app.get("/api/users/:id/avatar", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if(!user) return res.status(401).send('User Not Found')
      if(!user.profilePicture) return res.status(401).send('User Have No profile Picture')

      res.set("Content-Type", "image/png"); //Content-Type is response header
      res.send(user.profilePicture);
    } catch (e) {
      res.status(404).send();
    }
  });
};
