import { Request, Response } from "express";
import Person from "../../../models/Person";
import Show from "../../../models/Show";

//Create new show in to the db
/*
    Request body = {
        title: string <required>,
        audioURL: string <required>,
        audioDuration: number <required>
        audioConfigData: TAudioConfigData <optional> //TAudioConfigData - see "./typescriptUtils/interfaces" 
    }
 */
const createShow = async (req: Request, res: Response) => {
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
  let { title, audioURL, audioDuration, audioConfigData = {} } = req.body;

  if (title === "" || !title) {
    return res
      .status(400)
      .json({ success: false, message: "Title of show is required" });
  }

  if (audioURL === "" || !audioURL) {
    return res
      .status(400)
      .json({ success: false, message: "Audio URL is required" });
  }

  if (!audioDuration) {
    return res
      .status(400)
      .json({ success: false, message: "Audio Duration is required" });
  }

  try {
    //check if show title already exists
    // if (title) {
    //   const existingPersonWithName: any = await Show.findOne({
    //     title,
    //   });
    //   if (existingPersonWithName) {
    //     return res.status(400).json({
    //       success: false,
    //       message: `Person with name - ${name} already exist`,
    //     });
    //   }
    // }
    // //Check if connections are valid user IDs and exists
    // const existingPersons: any = await Person.find({
    //   _id: { $in: connections },
    // }).select({
    //   _id: 1,
    // });
    // //Set new connections IDs to those that match from the DB
    // if (existingPersons?.length > 0) {
    //   connections = existingPersons;
    // }
    // //Create default person image url from gravatar
    // const personImageURL = `https://ui-avatars.com/api/?name=${name
    //   .split(" ")
    //   .join("+")}&rounded=true&background=1F1F1F&color=000000&size=512`;
    // //Generate new person data
    // const newPersonData = {
    //   name,
    //   connections,
    //   imageURL: personImageURL,
    //   createdByUserID: userTokenData.user.id,
    //   updatedByUserID: userTokenData.user.id,
    // };
    // //Create new person in db
    // const newPerson = new Person(newPersonData);
    // await newPerson.save();
    // //Return success
    // return res.json({
    //   success: true,
    //   message: "New person created successfully",
    // });
  } catch (err) {
    //Log error and return error on catch
    console.error(`createPerson: ${err}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to create person" });
  }
};

export default createShow;
