import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
  name: String,
  googleid: String,
  wordsTyped: Number,
  storiesWorkedOn: [String], // story IDs
  storiesLiked: [String], // story IDs
  wordFrequencies: {String: Number}
});

export interface User extends Document {
  name: string;
  googleid: string;
  _id: string;
  wordsTyped: number;
  storiesWorkedOn: string[];
  storiesLiked: string[]; 
  wordFrequencies: Record<string, number>; // functions like a dictionary
}

const UserModel = model<User>("User", UserSchema);

export default UserModel;
