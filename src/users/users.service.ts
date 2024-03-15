import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // private users = [
  //   {
  //     id: '1',
  //     name: 'Jaiprakash',
  //     email: 'kushwaha02071999@gmail.com',
  //     role: 'Fullstack ',
  //   },
  //   {
  //     id: '2',
  //     name: 'Zaid',
  //     email: 'zaid@gmail.com',
  //     role: 'senior software engineer ',
  //   },
  //   {
  //     id: '3',
  //     name: 'Raju',
  //     email: 'raju@gmail.com',
  //     role: 'SDE3 ',
  //   },
  //   {
  //     id: '4',
  //     name: 'Rajveer',
  //     email: 'rajveer@gmail.com',
  //     role: 'SDE3 ',
  //   },
  //   {
  //     id: '5',
  //     name: 'Kunal',
  //     email: 'kunal@gmail.com',
  //     role: 'SDE2 ',
  //   },
  // ];
  // findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
  //   if (role) {
  //     const rolesArray = this.users.filter((user) => user.role === role);
  //     if (rolesArray.length === 0) {
  //       throw new NotFoundException('User role not found');
  //     }
  //     return rolesArray;
  //   }
  //   return this.users;
  // }
  // findOne(id: string) {
  //   const user = this.users.find((user) => user.id === id);
  //   if (!user) throw new NotFoundException('User not found');
  //   return user;
  // }
  // create(user: CreateUserDto) {
  //   let i = 1;
  //   const newUser = {
  //     id: i + '1',
  //     ...user,
  //   };
  //   this.users.push(newUser);
  //   i = i + 1;
  //   return newUser;
  // }
  // update(id: string, updatedUser: UpdateUserDto) {
  //   this.users ===
  //     this.users.map((user) => {
  //       if (user.id === id) {
  //         return { ...user, updatedUser };
  //       }
  //       return user;
  //     });
  //   return this.findOne(id);
  // }
  // delete(id: string) {
  //   const removedUser = this.users.filter((user) => user.id !== id);
  //   return removedUser;
  // }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: any): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, updatedUser: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updatedUser);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
