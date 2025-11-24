export class ProductDto {
    id: number = 0;
    Name: string = '';
    Description: string = '';
    productImage: number[] | null = null;
    Price: number = 0;
    Stock: number = 0;
    CategoryName: string = '';
    ArtistName: string[] = [];
}