import { Injectable } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';

import { AppService } from 'src/common/services';

import { UserService } from 'src/modules/user';

@Injectable()
export class AuthService extends AppService {
  constructor(private readonly userService: UserService) {
    super();
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
