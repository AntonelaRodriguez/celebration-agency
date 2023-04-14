import { IsEnum } from "class-validator";
import { RoleName } from "../role.enum";

export class CreateRoleDto {
    @IsEnum(RoleName, {message: 'Role only can be user or admin'})
    roleName: RoleName;
}