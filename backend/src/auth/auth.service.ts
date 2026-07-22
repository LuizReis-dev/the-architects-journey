import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { AuthProviderName } from '../users/schemas/auth-provider.schema'
import { UsersService } from '../users/users.service'
import { AuthenticatedUserDto } from './dto/authenticated-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUserDto | null> {
    const user = await this.usersService.findByEmail(email)

    if (!user?.password) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }

  async validateOAuthLogin(data: {
    email: string
    name: string
    providerId: string
  }): Promise<AuthenticatedUserDto> {
    const user = await this.usersService.findOrCreateOAuthUser({
      email: data.email,
      name: data.name,
      provider: AuthProviderName.GOOGLE,
      providerId: data.providerId,
    })

    if (!user) {
      throw new UnauthorizedException('Unable to authenticate with Google')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }

  login(user: AuthenticatedUserDto) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    }

    return {
      accessToken: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
    }
  }
}
