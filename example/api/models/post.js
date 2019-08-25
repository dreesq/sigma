/**
 * Post Schema
 */

module.exports = Schema => {
  return new Schema({
    title: String,
    content: String,
    userId: {
      type: Schema.ObjectId,
      references: 'user'
    }
  }, {
    timestamp: true
  })
}
