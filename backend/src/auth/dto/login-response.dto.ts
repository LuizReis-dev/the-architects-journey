import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjAwMDAwMDAwfQ.example',
  })
  accessToken: string

  @ApiProperty({ example: 'user@email.com' })
  email: string

  @ApiProperty({ example: 'Lucas' })
  name: string
}
