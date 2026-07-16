import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { baseSchemaOptions } from 'src/shared/utils/schema-options'

export type UserDocument = HydratedDocument<User>

@Schema(baseSchemaOptions)
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  password: string

  @Prop({ enum: [1, 2, 3, 4] })
  character?: number

  @Prop({ type: Date, default: null })
  deletedAt: Date | null
}

export const UserSchema = SchemaFactory.createForClass(User)
