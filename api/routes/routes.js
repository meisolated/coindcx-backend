module.exports = (app) => {
  const controllers = require("../controllers/controllers.js")

  var router = require("express").Router()

  // Get positions
  router.post("/getposition", controllers.getPosition)

  // add log
  router.post("/postlog", controllers.postLog)

  // get fav market
  router.get("/getfav", controllers.getFav)

  //add signal
  router.post("/postsignal", controllers.postSignal)
  
  // update fav
  router.post("/updatefav", controllers.updateFav)
  
  // // Retrieve all Tutorials
  // router.get("/", controllers.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", controllers.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", controllers.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", controllers.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", controllers.delete);

  // // Delete all Tutorials
  // router.delete("/", controllers.deleteAll);

  app.use("/api", router)
}
