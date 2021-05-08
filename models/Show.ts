import { model, Schema } from "mongoose";

const ShowSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Show title is required"],
    },
    audioURL: {
      type: String,
      trim: true,
      required: [true, "Audio url is required"],
    },
  },
  { collection: "shows", minimize: false, timestamps: true }
);

export default model("shows", ShowSchema);
