import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(User)
export class Auth extends Repository<User> {}