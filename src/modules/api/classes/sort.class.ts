export enum SortEnum
{
    Ascending = 'asc',
    Descending = 'desc',
}

export class Sort<TData>
{
    [ key: string ]: SortEnum
}