import { AttendantEntity } from '../../entities/attendant.entity';

export class GetAllAttendantsRequestDTO {
  name: string;
  age: number;
  responsible: string;
  responsiblePhoneNumber: string;
  take: number;
  skip: number;
}

export class SimplifiedAttendantDTO {
  id: number;
  name: string;
  age: number;
  responsible: string;
  responsiblePhoneNumber: string;
}

export class GetAllAttendantsResponseDTO {
  data: SimplifiedAttendantDTO[];
  count: number;
}
