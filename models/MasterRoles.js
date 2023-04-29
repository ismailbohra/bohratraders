const mongoose = require('mongoose')
const masterSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    user_type: {
      type: String,
      required: true
    },
    active: {
      type: String
    },
    Power: [String]
  },
  {
    timestamps: true,
  }
)

const MasterModel = mongoose.model('master_roles', masterSchema)

module.exports = MasterModel
