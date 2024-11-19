let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();

    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        },
        (err, assignments) => {
            if(err){
                res.send(err)
            }
            res.send(assignments);
        }
    )

    // Assignment.find((err, assignments) => {
    //     if(err){
    //         res.send(err)
    //     }
    //
    //     res.send(assignments);
    // });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.name = req.body.name;
    assignment.date = req.body.date;
    assignment.isDone = req.body.isDone;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
// suppression d'un assignment (DELETE)
// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    let assignmentId = req.params.id;
    Assignment.findOne({id : assignmentId}, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        console.log(req.params.id)
        console.log(assignment._id)
        Assignment.deleteOne({_id : assignment._id}, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'deleted'});
        });

    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
