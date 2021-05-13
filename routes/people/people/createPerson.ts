import { Request, Response } from "express";
import Person from "../../../models/Person";

//Create new person in to the db
/*
    Request body = {
        name: string <required>,
        connections: Array of person IDs <optional>, 
        base64Image: base64 string <optional>
    }
 */
const createPerson = async (req: Request, res: Response) => {
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

  //De-structure the request body properties
  let { name, connections = [], base64Image = null } = req.body;

  if (name === "" || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Name of person is required" });
  }

  try {
    //check if name exists
    if (name) {
      const existingPersonWithName: any = await Person.findOne({
        name,
      });
      if (existingPersonWithName) {
        return res.status(400).json({
          success: false,
          message: `Person with name - ${name} already exist`,
        });
      }
    }

    //Check if connections are valid user IDs and exists
    const existingPersons: any = await Person.find({
      _id: { $in: connections },
    }).select({
      _id: 1,
    });

    //Set new connections IDs to those that match from the DB
    if (existingPersons?.length > 0) {
      connections = existingPersons;
    }

    //Create default person image url from gravatar
    const personImageURL = `https://ui-avatars.com/api/?name=${name
      .split(" ")
      .join("+")}&rounded=true&background=1F1F1F&color=000000&size=512`;

    //Generate new person data
    const newPersonData = {
      name,
      connections,
      imageURL: personImageURL,
      createdByUserID: userTokenData.user.id,
      updatedByUserID: userTokenData.user.id,
    };

    //Create new person in db
    const newPerson = new Person(newPersonData);
    await newPerson.save();

    //Return success
    return res.json({
      success: true,
      message: "New person created successfully",
    });
  } catch (err) {
    //Log error and return error on catch
    console.error(`createPerson: ${err}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to create person" });
  }
};

export default createPerson;
