import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(data: CreateUserDto) {
    return this.userModel.create(data)
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
