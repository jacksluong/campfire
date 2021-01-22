import { Schema, model, Document } from "mongoose";

const Comment = new Schema({
  senderId: String,
  content: String
})

const StorySchema = new Schema({
  name: String,
  contributorIds: [String], // user IDs
  contributorNames: [String],
  content: String,
  usersThatLiked: [String],
  keywords: [String],
  comments: [Comment] 
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
