import { model, Schema } from "mongoose";

const timeIntervalSchema = new Schema(
  {
    from: {
      type: Number,
      default: null,
    },
    to: {
      type: Number,
      default: null,
    },
  },
  { _id: false }
);

const audioConfigDataSchema = new Schema(
  {
    timeInterval: {
      type: timeIntervalSchema,
      default: null,
    },
    people: {
      type: Array,
      default: [],
    },
    links: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

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
    audioConfigData: {
      type: [audioConfigDataSchema],
      default: [],
    },
  },
  { collection: "shows", minimize: false, timestamps: true }
);

export default model("shows", ShowSchema);
