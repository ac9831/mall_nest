import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZzimDrawerDto } from 'src/dto/ZzimDrawerDto';
import { User, ZzimDrawer } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZzimDrawerService {
  constructor(
    @InjectRepository(ZzimDrawer)
    private zzimDrawerRepository: Repository<ZzimDrawer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.zzimDrawerRepository = zzimDrawerRepository;
    this.userRepository = userRepository;
  }

  async findAll(userId: number) {
    return await this.zzimDrawerRepository.find({
      where: {
        id: userId,
      },
    });
  }

  async save(zzimDrawerDto: ZzimDrawerDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: zzimDrawerDto.userId,
      },
    });

    const zzimDrawer = new ZzimDrawer();
    zzimDrawer.name = zzimDrawerDto.name;
    zzimDrawer.user = user;
    return await this.zzimDrawerRepository.save(zzimDrawer);
  }

  async delete(id: number) {
    const zzimDrawer = await this.zzimDrawerRepository.findOne({
      where: {
        id: id,
      },
    });
    return this.zzimDrawerRepository.remove(zzimDrawer);
  }
}
