using HandmadeShop.DTOs;
using HandmadeShop.Models;

namespace HandmadeShop.Services.Interfaces;

public interface IProductService
{
    Product GetProductById(int id);
    Task AddProductAsync(ProductDto productDto);
    Task UpdateProductAsync(ProductDto productDto);
    void DeleteProduct(int id);
    Product GetProductAndRelatedById(int id);
    List<Product> GetAllProducts();
    List<ArtistProduct> GetAllArtistProducts();
    List<Category> GetAllCategories();
    List<Review> GetAllReviews();
    bool ProductExists(int id);
    List<OrderItem> GetAllOrderItems();
    List<WishlistProduct> GetAllWishlistProducts();
}