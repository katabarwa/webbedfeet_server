import { model, Schema } from "mongoose";

const PersonSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name of person is required"],
    },
    imageURL: {
      type: String,
      default: "",
    },
    connections: {
      type: Array,
      default: [],
    },
    createdByUserID: {
      type: String,
      required: [true, "ID of user creating the person is required"],
    },
    updatedByUserID: {
      type: String,
      required: [true, "ID of user updating the person is required"],
    },
  },
  { collection: "people", minimize: false, timestamps: true }
);

export default model("people", PersonSchema);
