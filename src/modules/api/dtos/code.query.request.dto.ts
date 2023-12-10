import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CodeQueryRequestDTO
{
    @ApiProperty()
    @IsString()
    code: string
}