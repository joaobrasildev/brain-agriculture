import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import {
  internalServerErrorResponseMessage,
  producerNotFoundResponseMessage,
} from '../../const/producer.const';
import { FarmRepository } from '@src/module/agriculture-control/persistence/repository/farm.repository';
import {
  ICreateFarmInput,
  ICreateFarmOutput,
} from '../../interface/farm.interface';
import { FarmModel } from '../../model/farm.model';
import { invalidAreaResponseMessage } from '../../const/farm.const';

@Injectable()
export class CreateFarmService {
  constructor(
    private readonly farmRepository: FarmRepository,
    private readonly producerRepository: ProducerRepository,
  ) {}
  async create(params: ICreateFarmInput): Promise<ICreateFarmOutput> {
    try {
      if (params.totalArea < params.agriculturalArea + params.vegetationArea)
        throw new BadRequestException(invalidAreaResponseMessage);

      const producerExists = await this.producerRepository.getProducerById(
        params.producerId,
      );
      if (!producerExists)
        throw new NotFoundException(producerNotFoundResponseMessage);

      const farmModel = new FarmModel({
        name: params.name,
        producerId: params.producerId,
        city: params.city,
        state: params.state,
        totalArea: params.totalArea,
        agriculturalArea: params.agriculturalArea,
        vegetationArea: params.vegetationArea,
      });
      const farm = await this.farmRepository.saveFarm(farmModel);

      return {
        id: farm.id,
        name: farm.name,
        producerId: farm.producerId,
        city: farm.city,
        state: farm.state,
        totalArea: farm.totalArea,
        agriculturalArea: farm.agriculturalArea,
        vegetationArea: farm.vegetationArea,
        createdAt: farm.createdAt,
      };
    } catch (error) {
      if (error instanceof NotFoundException || BadRequestException) {
        throw error;
      }
      console.log(
        `CREATE_FARM_ERROR::STATUS_CODE=500::FARM_NAME=${params.name}`,
      );
      throw new InternalServerErrorException(
        internalServerErrorResponseMessage,
      );
    }
  }
}
