/////////////////////////////////////////////
//// API endpoints for managing exercises //
///////////////////////////////////////////

const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Your Challenge: Make five routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// 1. get all exercise logs on record
// GET: /
// ========================================
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.send(exercises);
  } catch (err) {
    console.log(err);
  }
});

// 2. add a new exercise log
// POST: /add
// ========================================
router.post("/add", async (req, res) => {
  const exercise = new Exercise(req.body);
  await exercise
    .save()
    .then(result => {
      console.log(result);
      res.send(exercise);
    })
    .catch(err => {
      console.log(err);
    });
});

// 3. retrieve a specfic exercise log
// GET: /:id
// ========================================
router.get("/:id", async (req, res) => {
  try {const exercise = await Exercise.findById({ _id: req.params.id }) 
  res.send(exercise);
  }
  catch(err) {
    res.status(500).json({message: err.message})
  }
});

// 4. delete a specfic exercise log
// DELETE: /:id
// ========================================
router.delete("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.remove({ _id: req.params.id });
  res.send(exercise);
  }
  catch(err) {
    res.status(500).json({message: err})
  }
  
});

// 5. retrieve a specific exercise log and update it
// with information sent by client on req body
// POST: /update/:id
// ========================================
// router.put("/update/:id", async (req, res) => {
//   let id = req.params.id;
//   const exercise = await Exercise.findByIdAndUpdate(
//     { _id: id },
//     {
//       $set: {
//         username: req.body.username,
//         description: req.body.description,
//         duration: req.body.duration,
//         date: req.body.date,
//       },
//     },
//     { new: true }
//   );
//   res.send(exercise);
// });

router.put('/update/:id', async (req, res) => {
  try{
    const exercise = await Exercise.findById(req.params.id)
    exercise.set(req.body)
    const result = await exercise.save()
    res.send(result)
  }
  catch(err) {
    res.status(500).json({message: err.message})
  }
})

module.exports = router;
