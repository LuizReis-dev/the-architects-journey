import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum AuthProviderName {
  LOCAL = 'local',
  GOOGLE = 'google',
}

@Schema({ _id: false })
export class AuthProvider {
  @Prop({ required: true, enum: AuthProviderName })
  provider: AuthProviderName

  @Prop()
  providerId?: string
}

export const AuthProviderSchema = SchemaFactory.createForClass(AuthProvider)
