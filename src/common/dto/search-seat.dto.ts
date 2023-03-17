import { IsString, IsNotEmpty } from 'class-validator'

export class SearchSeatDTO {
    @IsString()
    @IsNotEmpty()
    start: string

    @IsString()
    @IsNotEmpty()
    reach: string
}
