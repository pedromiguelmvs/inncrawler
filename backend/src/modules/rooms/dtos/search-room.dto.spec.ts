import { plainToInstance } from 'class-transformer';
import { SearchRoomDto } from './search-room.dto';
import { validate } from 'class-validator';
import { ValidationError } from '@nestjs/common';

describe('SearchRoomDto', () => {
  it('should be defined', () => {
    const dto = new SearchRoomDto();
    expect(dto).toBeDefined();
  });

  it('should throw error when one field is empty', async () => {
    const emptyCheckin = {
      checkin: null,
      checkout: new Date('05-04-2024'),
    };

    const emptyCheckout = {
      checkin: new Date('05-04-2024'),
      checkout: null,
    };

    const checkInDto = plainToInstance(SearchRoomDto, emptyCheckin);
    const checkOutDto = plainToInstance(SearchRoomDto, emptyCheckout);

    const checkInErrors = await validate(checkInDto);
    const checkOutErrors = await validate(checkOutDto);

    expect(checkInErrors.length).not.toBe(0);
    expect(checkOutErrors.length).not.toBe(0);
  });

  it('should throw error when one field is not a valid date', async () => {
    const invalidCheckin = {
      checkout: new Date('05-04-2024'),
      checkin: new Date('invalid date'),
    };

    const invalidCheckout = {
      checkin: new Date('05-04-2024'),
      checkout: new Date('invalid date'),
    };

    const checkInDto = plainToInstance(SearchRoomDto, invalidCheckin);
    const checkOutDto = plainToInstance(SearchRoomDto, invalidCheckout);

    const checkInErrors = (await validate(checkInDto).then(
      (errors: ValidationError[]) => {
        return errors.filter((error) => error.property === 'checkin');
      },
    )) as ValidationError[];

    const checkOutErrors = (await validate(checkOutDto).then(
      (errors: ValidationError[]) => {
        return errors.filter((error) => error.property === 'checkout');
      },
    )) as ValidationError[];

    expect(checkInErrors.length).not.toBe(0);
    expect(checkOutErrors.length).not.toBe(0);

    expect(checkInErrors[0].constraints.matches).toBe(
      'O checkin deve estar no formato yyyy-mm-dd',
    );
    expect(checkOutErrors[0].constraints.matches).toBe(
      'O checkout deve estar no formato yyyy-mm-dd',
    );
  });
});
