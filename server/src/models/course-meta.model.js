// course-meta-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "courseMeta";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      courseId: { type: Schema.Types.ObjectId, required: true },
      share: { type: Number, required: true, default: 0 },
      register: { type: Number, required: true, default: 0 },
      rating: {
        oneStar: { type: Number, required: true, default: 0 },
        twoStar: { type: Number, required: true, default: 0 },
        threeStar: { type: Number, required: true, default: 0 },
        fourStar: { type: Number, required: true, default: 0 },
        fiveStar: { type: Number, required: true, default: 0 },
      },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
