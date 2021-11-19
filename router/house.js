const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const House = require("../models/house");
const upload = require("../upload");
const sharp = require("sharp");

module.exports = (app) => {
  //create house //DONE
  app.post("/api/house", auth, async (req, res) => {
    const house = new House({
      houseOwnerId: req.user._id,
      ...req.body,
    });

    try {
      await house.save();
      res.status(201).send(house);
    } catch (e) {
      res.status(400).send(Object.entries(e.errors)[0][1].message);
    }
  });

  //edit house //DONE
  app.patch("/api/house/:id", auth, async (req, res) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send("Invalid Id");

    const house = await House.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!house) return res.status(400).send("House Not Found");
    if (house.houseOwnerId.toString() !== req.user._id.toString())
      return res.status(401).send("Only House Owner Can Edit");

    try {
      await house.save();
      res.status(201).send(house);
    } catch (e) {
      res.status(400).send(Object.entries(e.errors)[0][1].message);
    }
  });

  //get all house  //DONE
  app.get("/api/houses/available", async (req, res) => {
    const house = await House.find({houseStatus:'available'}).select('-houseImages');
    try {
      res.status(201).send(house);
    } catch (error) {
      res.status(400).send(error);
    }
  })

   //get all house Login User //DONE
   app.get("/api/houses/available/authuser", auth, async (req, res) => {
    const house = await House.find({houseStatus:'available',houseOwnerId:{$ne:req.user._id}}).select('-houseImages');
    try {
      res.status(201).send(house);
    } catch (error) {
      res.status(400).send(error);
    }
  })

  //get all house  //DONE
  app.get("/api/houses", async (req, res) => {
   const house = await House.find({}).select('-houseImages');
  
    try {
      res.status(201).send(house);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //get house by id //DONE
  app.get("/api/house/:id", async (req, res) => {
    try {
      const house = await House.findById(req.params.id).select('-houseImages');
      if (!house) return res.status(400).send("House Not Found");

      house.totalView++;
      await house.save();

      res.status(201).send(house);
    } catch (e) {
      if (e.kind === "ObjectId") res.status(400).send("Invalid House Id");
      else res.status(400).send(e);
    }
  });

  //get single mans house by house owner id //DONE
  app.get("/api/house/ho/:id", async (req, res) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send("Invalid Id");

    try {
      const house = await House.find({ houseOwnerId: req.params.id }).select('-houseImages');
      if (!house) return res.status(400).send("House Not Found");
      res.status(201).send(house);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //delete house by houseowner //DONE
  app.delete("/api/house/:id", auth, async (req, res) => {
    try {
      const house = await House.findById(req.params.id);
      if (!house) return res.status(400).send("House Not Found");
      if (house.houseOwnerId.toString() !== req.user._id.toString())
        return res.status(401).send("Only House Owner Can Remove");

      await house.remove();
      res.status(200).send(house);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //delete house by admin
  app.delete("/api/house/a/:id", admin, async (req, res) => {
    try {
      const house = await House.findById(req.params.id);
      if (!house) return res.status(400).send("House Not Found");

      house.remove();
      res.status(200).send(house);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //Upload House Picture //DONE
  app.post( "/api/house/:houseId/upload", auth, upload.array("houseImage", 8), async (req, res) => {
      try {
        const house = await House.findById(req.params.houseId);
        if (!house) return res.status(400).send("House Not Found");
        if (house.houseOwnerId.toString() !== req.user._id.toString())
          return res.status(401).send("Only House Owner Can Upload");

        let bufArr = [];
        for (let i in req.files) {
          const sh = await sharp(req.files[i].buffer).png().toBuffer();
          bufArr = [...bufArr, sh];
        }

        house.houseImages = bufArr;
        house.houseImagesLength = bufArr.length;
        await house.save();
        res.send(house.houseImages[0]);
      } catch (e) {
        res.status(400).send(e.message);
      }
    }
  );

  //Get House Picture //DONE
  app.get("/api/house/:houseId/picture/:picNum", async (req, res) => {
    try {
      const house = await House.findById(req.params.houseId);
      if (!house) return res.status(400).send("House Not Found");

      res.set("Content-Type", "image/png"); //Content-Type is response header
      res.send(house.houseImages[req.params.picNum]);
    } catch (e) {
      res.status(404).send();
    }
  });

    //Added To Bookmark //DONE
    app.post("/api/house/:houseId/addbookmark", auth, async (req, res) => {
      const house = await House.findById(req.params.houseId);
      if (!house) return res.status(400).send("House Not Found");

      house.bookmarkedBy = [...house.bookmarkedBy, req.user._id]
      req.user.bookmarkedHouse = [...req.user.bookmarkedHouse, req.params.houseId]
      
      try {
        await house.save();
        await req.user.save()
        res.status(201).send({house:house,user:req.user});
      } catch (e) {
        res.status(400).send(Object.entries(e.errors)[0][1].message);
      }
    });

    //Removed Bookmark //DONE
    app.post("/api/house/:houseId/removebookmark", auth, async (req, res) => {
      const house = await House.findById(req.params.houseId);
      if (!house) return res.status(400).send("House Not Found");

      house.bookmarkedBy = house.bookmarkedBy.filter(element=>element !== req.user._id.toString())
      req.user.bookmarkedHouse = req.user.bookmarkedHouse.filter(element=>element !== req.params.houseId)

      try {
        await house.save();
        await req.user.save()
        res.status(201).send({house:house,user:req.user});
      } catch (e) {
        res.status(400).send(Object.entries(e.errors)[0][1].message);
      }
    });

};
