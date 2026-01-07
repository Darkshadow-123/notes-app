import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      maxlength: [5000, 'Content cannot be more than 5000 characters'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model<INote>('Note', noteSchema);
