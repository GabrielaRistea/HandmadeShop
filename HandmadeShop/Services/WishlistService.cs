using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Repositories.Interfaces;
using HandmadeShop.Services.Interfaces;

namespace HandmadeShop.Services;

public class WishlistService : IWishlistService
{
    private readonly IWishlistRepository _wishlistRepository;

    public WishlistService(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
    }

    public async Task<bool> AddProductToUserWishlistAsync(string userId, int productId)
    {
        var wishlist = await _wishlistRepository.GetByUserIdAsync(userId);
    
        foreach (var p in wishlist.Products)
        {
            if (p.ProductID == productId) return false; 
        }

        var product = await _wishlistRepository.GetProductByIdAsync(productId);
        if (product != null)
        {
            wishlist.Products.Add(product); 
            await _wishlistRepository.SaveChangesAsync();
            return true;
        }
        return false;
    }
    
    public async Task<bool> RemoveProductFromUserWishlistAsync(string userId, int productId)
    {
        var wishlist = await _wishlistRepository.GetByUserIdAsync(userId);
        if (wishlist == null) return false;

        Product produsDeSters = null;
        foreach (var p in wishlist.Products)
        {
            if (p.ProductID == productId)
            {
                produsDeSters = p;
                break;
            }
        }

        if (produsDeSters != null)
        {
            wishlist.Products.Remove(produsDeSters); 
            await _wishlistRepository.SaveChangesAsync();
            return true;
        }
        return false;
    }
    
    public async Task<List<ProductDto>> GetUserWishlistProductsAsync(string userId)
    {
        var wishlist = await _wishlistRepository.GetByUserIdAsync(userId);

        if (wishlist == null || wishlist.Products == null)
        {
            return new List<ProductDto>();
        }

        return wishlist.Products.Select(p => new ProductDto 
        {
            Id = p.ProductID,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            ProductImage = p.ProductImage,
            ImageFile = p.ImageFile,
            Category = p.CatogoryId, 
            CategoryName = p.Category?.Name ?? "Uncategorized",
            Artists = p.Artists?.Select(a => a.ArtistID).ToList(),
            ArtistNames = p.Artists?.Select(a => a.Name).ToList() 
        }).ToList();
    }
}