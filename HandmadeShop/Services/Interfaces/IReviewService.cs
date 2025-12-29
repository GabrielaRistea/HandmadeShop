using HandmadeShop.DTOs;
using HandmadeShop.Models;

namespace HandmadeShop.Services.Interfaces;

public interface IReviewService
{
    Task<Review> CreateReviewAsync(ReviewDto dto, string userId);
    Task<IEnumerable<DisplayReviewDto>> GetReviewsByProductAsync(int productId);
}