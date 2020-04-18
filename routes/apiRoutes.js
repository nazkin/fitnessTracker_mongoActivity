const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");
module.exports = function(app) {
  
// routes
app.get('/api/workouts', (req, res)=> {
    Workout.find({}).populate("exercises")
        .then(workouts => {
             res.send(workouts);
        }).catch(err=> res.send(err));

});
//getWorkoutsInRange
app.get('/api/workouts/range', (req, res)=> {
    Workout.find({}).populate("exercises")
        .then(wrkouts=> {
            res.send(wrkouts)
        }).catch(err=> res.send(err));
});
// //add exercise 
app.post('/api/workouts/:id', (req, res)=> {
    Workout.findById(req.params.id)
        .then(workout=> {
            Exercise.create(req.body, (err, exs)=> {
                if(err){
                    res.send(err)
                }else{
                    workout.exercises.push(exs);
                    workout.save();
                    res.send(exs);
                }
            })
        }).catch(err=> res.send(err));
}),
// //create workout
app.post('/api/workouts', (req, res)=> {
    Workout.create({date: req.body})
        .then(wrkout=> { 
            res.send(wrkout);
        }).catch(err=> res.send(err));
});
 
  };