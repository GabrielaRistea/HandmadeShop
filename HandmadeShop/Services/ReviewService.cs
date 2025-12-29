using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Repositories.Interfaces;
using HandmadeShop.Services.Interfaces;

namespace HandmadeShop.Services;

public class ReviewService : IReviewService
{
    private readonly IReviewRepository _repository;

    public ReviewService(IReviewRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<Review> CreateReviewAsync(ReviewDto dto, string userId)
    {
        var review = new Review
        {
            Comm = dto.Comm,
            Rating = dto.Rating,
            ProductId = dto.ProductId,
            UserId = userId
        };

        return await _repository.AddReviewAsync(review);
    }
    
    public async Task<IEnumerable<DisplayReviewDto>> GetReviewsByProductAsync(int productId)
    {
        var reviews = await _repository.GetReviewsByProductIdAsync(productId);

        return reviews.Select(r => new DisplayReviewDto
        {
            ReviewID = r.ReviewID,
            Comm = r.Comm,
            Rating = r.Rating,
            UserName = r.User.UserName 
        });
    }
}