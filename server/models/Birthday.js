import mongoose from "mongoose";

const birthdaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
});

const Birthday = mongoose.model("Birthday", birthdaySchema);
export default Birthday;