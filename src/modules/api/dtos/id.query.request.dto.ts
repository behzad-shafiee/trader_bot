import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class IdQueryRequestDTO
{
    @ApiProperty()
    @IsString()
    id: string
}