import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string

  @ApiProperty({ example: 'user@email.com' })
  email: string

  @ApiProperty({ example: 'Lucas' })
  name: string

  @ApiPropertyOptional({ enum: [1, 2, 3, 4], example: 1 })
  character?: number

  @ApiPropertyOptional({ nullable: true, example: null })
  deletedAt: Date | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
