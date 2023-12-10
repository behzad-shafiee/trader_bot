import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class TokenQueryRequestDTO
{
    @ApiProperty()
    @IsString()
    token: string
}