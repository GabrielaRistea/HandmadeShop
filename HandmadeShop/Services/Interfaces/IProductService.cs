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
    List<Artist> GetAllArtists();
    List<Category> GetAllCategories();
    List<Review> GetAllReviews();
    bool ProductExists(int id);
    List<OrderItem> GetAllOrderItems();
    //List<WishlistProduct> GetAllWishlistProducts();
    List<Product> searchProduct(string name);
    //ist<Product> ProductsByCategory(int id);
    Task<List<ProductDto>> ProductsByCategory(int id);
    Task<List<ProductDto>> ProductsByArtist(int id);
    List<Product> GetAllProductsSortedByPrice(bool ascending = true);
    Task<List<ProductDto>> GetSortedProductsAsync(bool ascending = true);
}