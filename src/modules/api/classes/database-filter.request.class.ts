import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class DatabaseFilterRequestDTO
{
    @ApiProperty()
    @IsOptional()
    @IsString()
    search?: string
}