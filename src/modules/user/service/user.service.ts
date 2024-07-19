import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppService } from 'src/common/services';
import { User } from '../models';

@Injectable()
export class UserService extends AppService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super();
  }
}
