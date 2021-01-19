import { Schema, model, Document } from "mongoose";

const StorySchema = new Schema({
  name: String,
  contributorIds: [String], // user IDs
  contributorNames: [String],
  content: String,
  usersThatLiked: [String],
  keywords: [String],
});

export interface Story extends Document {
  name: string;
  _id: string;
  contributorIds: string[];
  contributorNames: string[];
  content: string;
  usersThatLiked: string[]; // story IDs
  keywords: string[];
}

const StoryModel = model<Story>("Story", StorySchema);

export default StoryModel;
