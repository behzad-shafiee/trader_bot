import { Injectable } from '@nestjs/common'

@Injectable()
export class RandomService
{
    generateRandomNumber ( from = 0, to = 1 ): number
    {
        if ( to < from )
            throw new Error( '"to" must be bigger than or equal to "from" in generateRandomNumber-function' )

        let temp = Math.random()

        while ( temp < from )
            temp *= 10

        if ( temp > to )
            temp = to

        return temp
    }
}