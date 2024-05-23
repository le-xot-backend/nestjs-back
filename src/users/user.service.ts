import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/entity.user';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async returnUserInfo(username: string): Promise<any> {
    const usersRepository = this.dataSource.getRepository(User);
    const user = await usersRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException('Info not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
