import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

// export class EmailTypeLevelOneDTO {
//   @ApiProperty()
//   @IsOptional()
//   @IsString()
//   @IsEmail()
//   email: string;
// }

// export class MoblieTypeLevelOneDTO {
//   @ApiProperty()
//   @IsOptional()
//   @IsPhoneNumber('IR')
//   mobile: number;
// }

// export class CreateAccountMemberLevelOneDTO {
//   @ApiProperty({default:{email:"XXX@YYYYY",mobile:"09XXXXXXX"}})
//   @IsNotEmpty()
//   @ValidateNested()
//   @Type((data:TypeHelpOptions) => {
//     switch (
//       data.object.input_create_account_level_one.hasOwnProperty('email')
//     ) {
//       case true:
//         return EmailTypeLevelOneDTO;
//       case false:
//         return MoblieTypeLevelOneDTO;
//     }
//   })
//   input_create_account_level_one: Record<string, any>;
// }

export class CreateAccountMemberLevelOneDTO
{
  @ApiProperty()
  @IsOptional()
  data: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  level: string
}
