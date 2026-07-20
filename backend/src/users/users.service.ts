import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateOAuthUserDto } from './dto/create-oauth-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  private readonly saltRounds = 10

  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(
      createUserDto.password,
      this.saltRounds,
    )

    return this.usersRepository.create({
      ...createUserDto,
      password,
    })
  }

  findOrCreateOAuthUser(data: CreateOAuthUserDto) {
    return this.usersRepository.findOrCreateOAuthUser(data)
  }

  findAll() {
    return this.usersRepository.findAll()
  }

  findOne(id: string) {
    return this.usersRepository.findById(id)
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = { ...updateUserDto }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, this.saltRounds)
    }

    return this.usersRepository.update(id, data)
  }

  remove(id: string) {
    return this.usersRepository.softDelete(id)
  }
}
