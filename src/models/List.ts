import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  listTitle: string;
  userId: string;
  isActive: boolean;
}

const ListSchema = new Schema({
  listTitle: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

// module.exports = mongoose.model("List", ListSchema);
const List = model<IUser>("List", ListSchema);
export default List;
