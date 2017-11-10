import mongoose, { Schema } from 'mongoose'

const pasteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  pasteid: {
    type: String
  },
  order: {
    type: String
  },
  name: {
    type: String
  },
  category: {
    type: String
  }
}, {
  timestamps: true
})

pasteSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      pasteid: this.pasteid,
      order: this.order,
      name: this.name,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Paste', pasteSchema)

export const schema = model.schema
export default model
