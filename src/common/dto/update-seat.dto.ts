import { PartialType } from '@nestjs/mapped-types'
import { CreateSeatDTO } from './create-seat.dto'

export class UpdateSeatDTO extends PartialType(CreateSeatDTO) {}
