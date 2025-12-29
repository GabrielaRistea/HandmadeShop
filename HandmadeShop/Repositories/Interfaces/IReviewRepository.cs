using HandmadeShop.Models;

namespace HandmadeShop.Repositories.Interfaces;

public interface IReviewRepository
{
    Task<Review> AddReviewAsync(Review review);
    Task<IEnumerable<Review>> GetReviewsByProductIdAsync(int productId);
}