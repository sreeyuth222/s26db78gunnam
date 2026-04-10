const Costume = require('../models/costume');
const mongoose = require('mongoose');

// List of all Costumes
exports.costume_list = async function(req, res) {
    try {
        theCostumes = await Costume.find();
        res.send(theCostumes);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// For a specific Costume
exports.costume_detail = async function(req, res) {
    console.log("detail " + req.params.id)
    try {
        let result = await Costume.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": "Document for id ${req.params.id} not found"}`)
    }
};

// Handle Costume create on POST
exports.costume_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Costume();

    document.costume_type = req.body.costume_type;
    document.cost = req.body.cost;
    document.size = req.body.size;

    try {
        let result = await document.save();
        res.send(result);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Costume delete on DELETE
exports.costume_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        let result = await Costume.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error":"Error deleting ${err}"}`)
    }
};

// Handle Costume update on PUT
exports.costume_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Costume.findById(req.params.id)

        if(req.body.costume_type)
            toUpdate.costume_type = req.body.costume_type;

        if(req.body.cost)
            toUpdate.cost = req.body.cost;

        if(req.body.size)
            toUpdate.size = req.body.size;

        let result = await toUpdate.save();
        console.log("Success " + result)
        res.send(result)

    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`)
    }
};

// VIEWS
// Handle a show all view
exports.costume_view_all_Page = async function(req, res) {
    try {
        theCostumes = await Costume.find();
        res.render('costume', { title: 'Costume Search Results', results: theCostumes });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.costume_view_one_Page = async function(req, res) {
    // BONUS: protect detail page from missing/invalid ids and missing documents.
    console.log("single view for id " + req.query.id)
    const requestedId = req.query.id;
    if (!requestedId) {
        res.status(400);
        return res.send("Missing id in query. Use /costumes/detail?id=<costume_id>");
    }

    if (!mongoose.Types.ObjectId.isValid(requestedId)) {
        res.status(400);
        return res.send("Invalid costume id format");
    }

    try {
        let result = await Costume.findById(requestedId)
        if (!result) {
            res.status(404);
            return res.send("No costume found for this id");
        }
        res.render('costumedetail', { title: 'Costume Detail', toShow: result })
    } catch (err) {
        res.status(500)
        res.send("Unable to load costume detail")
    }
};

// Handle building the view for creating a costume.
exports.costume_create_Page = function(req, res) {
    res.render('costumecreate', { title: 'Costume Create' });
};

// Handle building the view for updating a costume.
exports.costume_update_Page = async function(req, res) {
    // BONUS: protect update page from missing/invalid ids and missing documents.
    console.log("update view for item " + req.query.id)
    const requestedId = req.query.id;
    if (!requestedId) {
        res.status(400);
        return res.send("Missing id in query. Use /costumes/update?id=<costume_id>");
    }

    if (!mongoose.Types.ObjectId.isValid(requestedId)) {
        res.status(400);
        return res.send("Invalid costume id format");
    }

    try {
        let result = await Costume.findById(requestedId)
        if (!result) {
            res.status(404);
            return res.send("No costume found for this id");
        }
        res.render('costumeupdate', { title: 'Costume Update', toShow: result });
    } catch (err) {
        res.status(500)
        res.send("Unable to load costume update page")
    }
};

// Handle a delete one view with id from query.
exports.costume_delete_Page = async function(req, res) {
    console.log("delete view for id " + req.query.id)
    try {
        let result = await Costume.findById(req.query.id)
        res.render('costumedelete', { title: 'Costume Delete', toShow: result });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`)
    }
};