import { Request, Response } from "express";
import Person from "../../../models/Person";

//Update person in the db based on id
/*
    Request body = {
        name: string <required>,
        connections: Array of person IDs <optional>, 
        base64Image: base64 string <optional>
    }
 */
const updatePerson = async (req: Request, res: Response) => {
  //Check if user token data exists (added from the authorization middleware)
  const userTokenData = req.userTokenData;

  if (!userTokenData) {
    return res.status(400).json({
      success: false,
      message: "User authorization token is not valid",
    });
  }

  //Check if request contains a body
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "No data was sent to the server" });
  }

  //Check if request has id params
  if (!req.params.id) {
    return res
      .status(400)
      .json({ success: false, message: "No person id received" });
  }
  const personID = req.params.id;

  //De-structure the request body properties
  let { name, connections = [], base64Image } = req.body;

  try {
    //Check if person exists
    const existingPerson: any = await Person.findOne({
      _id: personID,
    });
    if (!existingPerson) {
      return res
        .status(400)
        .json({ success: false, message: "Person to update does not exist" });
    }

    //check if name exists
    if (name) {
      const existingPersonWithName: any = await Person.findOne({
        name,
      });
      if (existingPersonWithName?._id !== personID) {
        return res.status(400).json({
          success: false,
          message: `Person with name - ${name} already exist`,
        });
      }
    }

    //Check if connections are valid user IDs and exists
    const existingPersons: any = await Person.find({
      _id: { $in: connections },
    });

    //Set new connections IDs to those that match from the DB
    if (existingPersons?.length > 0) {
      connections = existingPersons;
    }

    //Generate updated person data
    const updatedPersonData: any = {
      createdByUserID: userTokenData.user.id,
      updatedByUserID: userTokenData.user.id,
    };

    if (name) updatedPersonData.name = name;
    if (connections) updatedPersonData.name = connections;

    //Update person
    await Person.findOneAndUpdate(
      {
        _id: personID,
      },
      {
        $set: {
          ...updatedPersonData,
        },
      }
    );

    //Return success
    return res.json({
      success: true,
      message: "Person updated successfully",
    });
  } catch (err) {
    //Log error and return error on catch
    console.error(`updatePerson: ${err}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to create person" });
  }
};

export default updatePerson;
