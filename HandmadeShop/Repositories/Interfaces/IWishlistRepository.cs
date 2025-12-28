using HandmadeShop.Models;

namespace HandmadeShop.Repositories.Interfaces;

public interface IWishlistRepository
{
    Task<Wishlist> GetByUserIdAsync(string userId);
    Task<Product> GetProductByIdAsync(int productId); 
    Task CreateWishlistAsync(Wishlist wishlist);
    Task SaveChangesAsync();
}