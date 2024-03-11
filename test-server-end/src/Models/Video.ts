import mongoose, { Schema } from "mongoose";

export interface IVideo extends mongoose.Document {
  url: string;
  duration: number; // Add duration property
}

const videoSchema = new Schema({
  url: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
});

const Video = mongoose.model<IVideo>("Video", videoSchema);

export default Video;
