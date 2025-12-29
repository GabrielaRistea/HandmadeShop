using HandmadeShop.Context;
using HandmadeShop.Models;
using HandmadeShop.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HandmadeShop.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly ShopContext _context;

    public ReviewRepository(ShopContext context)
    {
        _context = context;
    }
    
    public async Task<Review> AddReviewAsync(Review review)
    {
        await _context.Reviews.AddAsync(review);
        await _context.SaveChangesAsync();
        return review;
    }

    public async Task<IEnumerable<Review>> GetReviewsByProductIdAsync(int productId)
    {
        return await _context.Reviews
            .Where(r => r.ProductId == productId)
            .Include(r => r.User) 
            .ToListAsync();
    }
}