import express from "express";
import authorization from "../../middleware/authorization";
import getShows from "./methods/getShows";

//declare the express router
const router = express.Router();

// @route     GET api/shows
// @desc      get shows
// @access    Private
// @optional  query parameters

router.get("/", authorization, getShows);

export default router;
