import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    img: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password instance method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// // Virtual field for age
// userSchema.virtual("age").get(function () {
//   if (!this.dob) return null;
//   const dob = new Date(this.dob);
//   const diff = Date.now() - dob.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// });

// // Static method to find users by role
// userSchema.statics.findByRole = function (role) {
//   return this.find({ role });
// };

const User = mongoose.model("User", userSchema);

export default User;
