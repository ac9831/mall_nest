import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZzimDto } from 'src/dto/ZzimDto';
import { Product } from 'src/entity/Product';
import { Zzim } from 'src/entity/Zzim';
import { ZzimDrawer } from 'src/entity/ZzimDrawer';
import { Repository } from 'typeorm';

@Injectable()
export class ZzimService {
  constructor(
    @InjectRepository(Zzim) private zzimRepository: Repository<Zzim>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ZzimDrawer)
    private zzimDrawerRepository: Repository<ZzimDrawer>,
  ) {
    this.zzimRepository = zzimRepository;
    this.productRepository = productRepository;
    this.zzimDrawerRepository = zzimDrawerRepository;
  }

  async findAll(zzimDrawerId: number) {
    return await this.zzimRepository.find({
      relations: {
        zzimDrawer: true,
        product: true,
      },
      where: {
        zzimDrawer: {
          id: zzimDrawerId,
        },
      },
    });
  }

  async save(zzimDto: ZzimDto) {
    const product = await this.productRepository.findOne({
      where: {
        id: zzimDto.productId,
      },
    });

    const zzimDrawer = await this.zzimDrawerRepository.findOne({
      where: {
        id: zzimDto.zzimDrawerId,
      },
    });

    const zzimCheck = await this.zzimRepository.find({
      relations: {
        product: true,
      },
      where: {
        product: {
          id: zzimDto.productId,
        },
      },
    });

    if (!zzimDrawer || !product) {
      return new BadRequestException(
        '서랍이 존재하지 않거나 상품이 존재하지 않습니다.',
      );
    }

    if (zzimCheck.length > 0) {
      return new BadRequestException('중복된 찜 요청 입니다.');
    }

    const zzim = new Zzim();
    zzim.product = product;
    zzim.zzimDrawer = zzimDrawer;
    return await this.zzimRepository.save(zzim);
  }

  async delete(id: number) {
    const zzim = await this.zzimRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log(zzim);
    return this.zzimRepository.remove(zzim);
  }
}
