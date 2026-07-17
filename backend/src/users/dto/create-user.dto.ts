import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Lucas' })
  @IsString()
  name: string

  @ApiProperty({ example: 'Senha@123', minLength: 8 })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/, {
    message:
      'password must contain at least one uppercase letter, one lowercase letter and one special character',
  })
  password: string

  @ApiPropertyOptional({ enum: [1, 2, 3, 4], example: 1 })
  @IsOptional()
  @IsIn([1, 2, 3, 4])
  character?: 1 | 2 | 3 | 4
}
