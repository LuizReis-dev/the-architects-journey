import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import { AuthProviderName } from '../../users/schemas/auth-provider.schema'
import { AuthService } from '../auth.service'
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    })
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<AuthenticatedUserDto> {
    const email = profile.emails?.[0]?.value

    if (!email) {
      throw new UnauthorizedException('GitHub account has no public email')
    }

    return this.authService.validateOAuthLogin({
      email,
      name: profile.displayName || profile.username || email,
      provider: AuthProviderName.GITHUB,
      providerId: profile.id,
    })
  }
}
