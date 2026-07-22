import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Public } from '../shared/decorators/public.decorator'
import { AuthService } from './auth.service'
import { AuthenticatedUserDto } from './dto/authenticated-user.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { LoginDto } from './dto/login.dto'
import { GithubAuthGuard } from './guards/github-auth.guard'
import { GoogleAuthGuard } from './guards/google-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login and get JWT' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Request() req: { user: AuthenticatedUserDto }) {
    return this.authService.login(req.user)
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: 'Start Google OAuth login',
    description: 'Open this URL in the browser to authenticate with Google.',
  })
  googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiOkResponse({ type: LoginResponseDto })
  googleAuthCallback(@Request() req: { user: AuthenticatedUserDto }) {
    return this.authService.login(req.user)
  }

  @Public()
  @Get('github')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({
    summary: 'Start GitHub OAuth login',
    description: 'Open this URL in the browser to authenticate with GitHub.',
  })
  githubAuth() {}

  @Public()
  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: 'GitHub OAuth callback' })
  @ApiOkResponse({ type: LoginResponseDto })
  githubAuthCallback(@Request() req: { user: AuthenticatedUserDto }) {
    return this.authService.login(req.user)
  }
}
