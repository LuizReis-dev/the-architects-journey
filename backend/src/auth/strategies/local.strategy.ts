import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(
    email: string,
    password: string,
  ): Promise<AuthenticatedUserDto> {
    const user = await this.authService.validateUser(email, password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }
}
