import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

class UserSchema extends Schema {
  constructor() {
    super({
      _id: {
        type: String,
        default: uuidv4(),
      },
      name: String,
      createAt: {
        type: Date,
        value: Date.now,
      },
      updateAt: {
        type: Date,
        value: Date.now,
      },
    });
  }
}

export default mongoose.model<UserSchema>("User", new UserSchema());
