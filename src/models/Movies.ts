import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  movieId: number;
  movieTitle: string;
  movieYear: number;
  userId: string;
  listId: string;
}

const MovieSchema = new Schema({
  movieId: {
    type: Number,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  movieYear: {
    type: Number,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  listId: {
    type: String,
    required: true,
  },
});

// module.exports = mongoose.model("Movie", MovieSchema);
const Movie = model<IUser>("Movie", MovieSchema);
export default Movie;
