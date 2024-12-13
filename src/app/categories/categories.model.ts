export interface CategoryResponse {
    id: number,
    name: string,
    level: string,
    description: string
}

export interface CategoryInsert
{
    name: string,
    level: string,
    description: string
}

export interface GetCategory {
    message: string;
    status: string;
    data: CategoryResponse;
}