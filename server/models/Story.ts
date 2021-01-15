import { Schema, model, Document } from "mongoose";

const StorySchema = new Schema({
  name: String,
  contributors: [String], // user IDs
  content: String,
  usersThatLiked: [String],
  keywords: [String]
});

export interface Story extends Document {
  name: string;
  _id: string;
  contributors: [string];
  content: string;
  usersThatLiked: [string]; // story IDs
  keywords: [string]; 
}

const StoryModel = model<Story>("Story", StorySchema);

export default StoryModel;
