import { SchemaOptions } from '@nestjs/mongoose'

export const baseSchemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      ret = { id: String(ret._id), ...ret }
      delete ret._id
      return ret
    },
  },
}
