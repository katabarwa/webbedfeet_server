import { Request, Response } from "express";
import Person from "../../../models/Person";

//Delete person in the db based on id

const deletePerson = async (req: Request, res: Response) => {
  //Check if user token data exists (added from the authorization middleware)
  const userTokenData = req.userTokenData;

  if (!userTokenData) {
    return res.status(400).json({
      success: false,
      message: "User authorization token is not valid",
    });
  }

  //Check if request has id params
  if (!req.params.id) {
    return res
      .status(400)
      .json({ success: false, message: "No person id received" });
  }
  const personID = req.params.id;

  try {
    //Check if person exists
    const existingPerson: any = await Person.findOne({
      _id: personID,
    });
    if (!existingPerson) {
      return res
        .status(400)
        .json({ success: false, message: "Person to delete does not exist" });
    }

    //Delete person
    await Person.deleteOne({
      _id: personID,
    });

    //Return success
    return res.json({
      success: true,
      message: "Person deleted successfully",
    });
  } catch (err) {
    //Log error and return error on catch
    console.error(`deletePerson: ${err}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete person" });
  }
};

export default deletePerson;
