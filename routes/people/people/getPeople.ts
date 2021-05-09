import { Request, Response } from "express";
import Person from "../../../models/Person";
import User from "../../../models/User";

//Get people
//Optional: query parameters
const getPeople = async (req: Request, res: Response) => {
  try {
    //Retrieve people
    const people: any = await Person.find();

    //Return error if no show found
    if (!people || people.length < 1) {
      return res.status(400).json({
        success: false,
        message: "No people found",
      });
    }

    //Retrieve people connection details
    const peopleWithDetails = [];
    for (let person of people) {
      //Pull the person doc form the mongo format
      const personDoc = { ...person._doc };

      const [createdBy, updatedBy, personConnections] = await Promise.all([
        await User.findOne({
          _id: person.createdByUserID,
        }).select({
          _id: 1,
          fullName: 1,
        }),

        await User.findOne({
          _id: person.updatedByUserID,
        }).select({
          _id: 1,
          fullName: 1,
        }),

        await Person.find({
          _id: { $in: person.connections },
        }).select({
          _id: 1,
          name: 1,
        }),
      ]);

      personDoc.createdBy = createdBy;
      personDoc.updatedBy = updatedBy;
      personDoc.personConnections = personConnections;
      peopleWithDetails.push(personDoc);
    }

    //Return people retrieved successfully
    return res.json({
      success: true,
      message: "Shows retrieved successfully",
      data: peopleWithDetails,
    });
  } catch (err) {
    //Log error and return error on catch
    console.error(`getPeople: ${err}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve people" });
  }
};

export default getPeople;
