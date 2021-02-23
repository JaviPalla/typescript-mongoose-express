import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IEntry extends Document {
  description: String,
  priority: String,
  done: Boolean
}

export interface IEntryModel extends Model<IEntry> {
  updateEntry(id: {}, description: string): Promise<{ nModified: number }>
}

const schema = new Schema({
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    "default": false
  }
});

schema.static("updateEntry", (entry: {}, description: string) => {

  return Entry
    .update({
      "_id": entry
    }, {
      "$set": {
        "description": description
      }
    })
    .exec();
});

export const Entry = mongoose.model<IEntry>("entries", schema) as IEntryModel;
