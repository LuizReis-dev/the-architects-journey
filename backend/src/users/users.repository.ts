import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateOAuthUserDto } from './dto/create-oauth-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthProviderName } from './schemas/auth-provider.schema'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(data: CreateUserDto & { password: string }) {
    return this.userModel.create({
      ...data,
      providers: [{ provider: AuthProviderName.LOCAL }],
    })
  }

  async findOrCreateOAuthUser(data: CreateOAuthUserDto) {
    const user = await this.findByEmail(data.email)

    if (!user) {
      return this.userModel.create({
        email: data.email,
        name: data.name,
        providers: [
          {
            provider: data.provider,
            providerId: data.providerId,
          },
        ],
      })
    }

    if (!user.providers) {
      user.providers = []
    }

    const alreadyLinked = user.providers.some(
      (item) =>
        item.provider === data.provider &&
        item.providerId === data.providerId,
    )

    if (!alreadyLinked) {
      user.providers.push({
        provider: data.provider,
        providerId: data.providerId,
      })
      await user.save()
    }

    return user
  }

  findAll() {
    return this.userModel.find({ deletedAt: null }).exec()
  }

  findById(id: string) {
    return this.userModel.findOne({ _id: id, deletedAt: null }).exec()
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email, deletedAt: null }).exec()
  }

  update(id: string, data: UpdateUserDto) {
    return this.userModel
      .findOneAndUpdate({ _id: id, deletedAt: null }, data, {
        returnDocument: 'after',
      })
      .exec()
  }

  softDelete(id: string) {
    return this.userModel
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        { deletedAt: new Date() },
        { returnDocument: 'after' },
      )
      .exec()
  }
}
