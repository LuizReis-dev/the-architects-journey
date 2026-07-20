import { AuthProviderName } from '../schemas/auth-provider.schema'

export class CreateOAuthUserDto {
  email: string
  name: string
  provider: AuthProviderName
  providerId: string
}
