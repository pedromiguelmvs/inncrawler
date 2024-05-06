import { IsNotEmpty, Matches } from 'class-validator';
import { IsNotBeforeToday } from 'src/common/constraints/before-today.constraint';

export class SearchRoomDto {
  @IsNotEmpty({ message: 'A data inicial é obrigatória!' })
  @Matches(/^(20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: 'O checkin deve estar no formato yyyy-mm-dd',
  })
  @IsNotBeforeToday()
  checkin: string;

  @IsNotEmpty({ message: 'A data final é obrigatória!' })
  @Matches(/^(20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: 'O checkout deve estar no formato yyyy-mm-dd',
  })
  @IsNotBeforeToday()
  checkout: string;
}
