import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  email: string

  @ApiProperty({ example: 'Lucas' })
  name: string

  @ApiProperty({ example: 'senha123', minLength: 6 })
  password: string

  @ApiPropertyOptional({ enum: [1, 2, 3, 4], example: 1 })
  character?: 1 | 2 | 3 | 4
}
