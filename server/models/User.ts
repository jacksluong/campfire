import { Schema, model, Document } from "mongoose";

const FrequentWord = new Schema({
  word: String,
  frequency: Number,
});

const UserSchema = new Schema({
  name: String,
  googleid: String,
  pfp: String,
  wordsTyped: Number,
  storiesWorkedOn: [String], // story IDs
  storiesLiked: [String], // story IDs
  wordFrequencies: [FrequentWord],
});

export interface User extends Document {
  name: string;
  googleid: string;
  pfp: string;
  _id: string;
  wordsTyped: number;
  storiesWorkedOn: string[];
  storiesLiked: string[];
  wordFrequencies: { word: string; frequency: number }[]; // functions like a dictionary
}

const UserModel = model<User>("User", UserSchema);

export default UserModel;
