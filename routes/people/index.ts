import express from "express";
import authorization from "../../middleware/authorization";
import createPerson from "./people/createPerson";
import deletePerson from "./people/deletePerson";
import getPeople from "./people/getPeople";
import updatePerson from "./people/updatePerson";

//declare the express router
const router = express.Router();

// @route     GET api/people
// @desc      Get people
// @access    Private
// @optional  query parameters
router.get("/", authorization, getPeople);

// @route     POST api/person/create
// @desc      Create new person
// @access    Private
// @required  Request body
/*
    Request body = {
        name: string <required>,
        connections: Array of person IDs <optional>, 
        image: base64 string <optional>
    }
 */
router.post("/create", authorization, createPerson);

// @route     PATCH api/person/update/:id
// @desc      Update person by id
// @access    Private
// @required  Request body and Request params - :id
/*
    Request body = {
        name: string <required>,
        connections: Array of person IDs <optional>, 
        image: base64 string <optional>
    }
 */
router.patch("/update/:id", authorization, updatePerson);

// @route     DELETE api/person/delete/:id
// @desc      Delete person by id
// @access    Private
// @required  Request params - :id
router.delete("/delete/:id", authorization, deletePerson);

export default router;
