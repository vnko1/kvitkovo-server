import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuid } from "uuid";

import { AppService } from "src/common/services";

import { MailService } from "src/modules/mail";
import { UserService } from "src/modules/user";
import { RegisterDto } from "../dto";

@Injectable()
export class AuthService extends AppService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {
    super();
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.createUser(
      registerDto,
      undefined,
      "adminScope"
    );
    return user;
  }
}

//   async setConfirmationCode(userId: number): Promise<void> {
//     const code = uuid();
//     const user = await this.userModel.findByPk(userId);
//     if (user) {
//       user.setConfirmationCode(code);
//       await user.save();
//     }
//   }
