import mongoose, { Document, Schema, Model } from "mongoose";

interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  picture?: string;
  cover?: string;
  gender: "male" | "female" | "other";
  birth_year: number;
  birth_year_month: number;
  birth_year_day: number;
  verified?: boolean;
  friends?: string[];
  following?: string[];
  followers?: string[];
  requests?: string[];
  search?: mongoose.Types.ObjectId[];
  details?: {
    biography?: string;
    otherName?: string;
    job?: string;
    workPlace?: string;
    highSchool?: string;
    college?: string;
    currentCity?: string;
    homeTown?: string;
    relationShip?: "single" | "married" | "divorced" | "widowed" | "other";
    instagram?: string;
  };
  savedPosts?: { post: mongoose.Types.ObjectId; savedAt: Date }[];
}

const userSchema: Schema = new Schema(
  {
    first_name: { type: String, required: true, trim: true, text: true },
    last_name: { type: String, required: true, trim: true, text: true },
    username: { type: String, required: true, unique: true, trim: true, text: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
        message: "Invalid email format",
      },
    },
    password: { type: String, required: true, select: false },
    picture: { type: String, default: "default.jpg" },
    cover: { type: String },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    birth_year: { type: Number, required: true, trim: true },
    birth_year_month: { type: Number, required: true, trim: true },
    birth_year_day: { type: Number, required: true, trim: true },
    verified: { type: Boolean, default: false },
    friends: { type: [String], default: [] },
    following: { type: [String], default: [] },
    followers: { type: [String], default: [] },
    requests: { type: [String], default: [] },
    search: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    details: {
      biography: { type: String, trim: true, text: true },
      otherName: { type: String, trim: true, text: true },
      job: { type: String, trim: true, text: true },
      workPlace: { type: String, trim: true, text: true },
      highSchool: { type: String, trim: true, text: true },
      college: { type: String, trim: true, text: true },
      currentCity: { type: String, trim: true, text: true },
      homeTown: { type: String, trim: true, text: true },
      relationShip: { type: String, enum: ["single", "married", "divorced", "widowed", "other"] },
      instagram: { type: String },
    },
    savedPosts: [
      {
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        savedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
