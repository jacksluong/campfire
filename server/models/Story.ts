import { Schema, model, Document } from "mongoose";

const Comment = new Schema({
  name: String,
  senderId: String,
  content: String,
  pfp: String,
});

const StorySchema = new Schema({
  name: String,
  contributorIds: [String], // user IDs
  contributorNames: [String],
  content: String,
  usersThatLiked: [String],
  keywords: [String],
  comments: [Comment],
});

export interface Story extends Document {
  name: string;
  _id: string;
  contributorIds: string[];
  contributorNames: string[];
  content: string;
  usersThatLiked: string[]; // story IDs
  keywords: string[];
  comments: { 
    name: string; 
    senderId: string; 
    content: string;
    pfp: string;
  }[];
}

export interface Comment {
  name: string;
  senderId: string;
  content: string;
  pfp: string;
}

const StoryModel = model<Story>("Story", StorySchema);

export default StoryModel;
