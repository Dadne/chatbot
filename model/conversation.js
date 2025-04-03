const mongoose = require("mongoose");
const uuid = require("uuid");

const conversationSchema = new mongoose.Schema(
  {
    conversation_id: {
      type: String,
      required: true,
      default: uuid.v4(),
    },
    message: [
      {
        role: {
          type: String,
          enum: ["user", "bot"],
        },
        message: String,
        date: {
          type: Date,
          default: Date.now,
        }
      }, { _id: false }
    ],
  },

  { collection: "conversation" },
  {versionKey:false}
);

conversationSchema.set('toJSON', {
  transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      if (ret.message) {
        ret.message.forEach(msg => {
          delete msg._id;
          delete msg.date
        });
      }
      return ret;
  }
});

module.exports = mongoose.model("conversation", conversationSchema);
