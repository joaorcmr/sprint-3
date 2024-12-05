import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AttendantsService } from './attendants.service';
import {
  GetAllAttendantsRequestDTO,
  GetAllAttendantsResponseDTO,
} from './dtos/get-all-attendants.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../shared/guards/jwt.guard';
import { AttendantEntity } from '../entities/attendant.entity';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAttendantDTO } from './dtos/create-attendant.dto';
import { CreateResponsibleDTO } from './dtos/create-responsible.dto';
import { CreateHealthRecordDTO } from './dtos/create-health-record.dto';
import { CreateHomeVisitRecordDTO } from './dtos/create-home-visit.dto';
import { CreateFamilyCompositionDTO } from './dtos/create-family-composition.dto';

@Controller('attendants')
@UseGuards(JwtAuthGuard)
export class AttendantsController {
  constructor(private readonly _attendantsService: AttendantsService) {}

  @Get('/')
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: GetAllAttendantsRequestDTO,
    @Res() res: Response<GetAllAttendantsResponseDTO>,
  ): Promise<Response<GetAllAttendantsResponseDTO>> {
    const response = await this._attendantsService.findAll(query);
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('/:id')
  async findById(
    @Param('id') id: number,
    @Res() res: Response<AttendantEntity>,
  ): Promise<Response<AttendantEntity>> {
    const response = await this._attendantsService.findById(id);
    return res.status(HttpStatus.OK).json(response);
  }

  @Post('/')
  async createAttendant(@Body() body: any, @Res() res: Response) {
    try {
      const response = await this._attendantsService.createAttendant(
        plainToClass(CreateResponsibleDTO, body.responsible),
        plainToClass(CreateAttendantDTO, body.attendant),
        plainToClass(CreateHealthRecordDTO, body.healthRecord),
        plainToClass(CreateHomeVisitRecordDTO, body.homeVisitRecord),
        body.familyComposition?.map((fc: any) =>
          plainToClass(CreateFamilyCompositionDTO, fc),
        ),
      );

      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('/:id')
  async deleteAttendant(@Param('id') id: number, @Res() res: Response) {
    await this._attendantsService.deleteAttendant(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
