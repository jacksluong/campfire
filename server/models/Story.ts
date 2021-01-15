import { Schema, model, Document } from "mongoose";

const StorySchema = new Schema({
  name: String,
  googleid: String,
  contributors: [String], // user IDs
  content: String,
  usersThatLiked: [String]
});

export interface Story extends Document {
  name: string;
  googleid: string;
  _id: string;
  wordsTyped: number;
  storiesWorkedOn: [string]; // story IDs
  storiesLiked: [string]; // story IDs
  wordFrequencies: [string: number]; 
}

const StoryModel = model<Story>("Story", StorySchema);

export default StoryModel;
