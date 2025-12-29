using System.Security.Claims;
using HandmadeShop.DTOs;
using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HandmadeShop.Controllers;

[ApiController]
[Route("[controller]")]

public class ReviewController : Controller
{
    private readonly IReviewService _reviewService;

    public ReviewController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> PostReview([FromBody] ReviewDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _reviewService.CreateReviewAsync(dto, userId);
        return Ok(result);
    }
    
    [HttpGet("product/{productId}")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<DisplayReviewDto>>> GetByProduct(int productId)
    {
        var reviews = await _reviewService.GetReviewsByProductAsync(productId);
    
        if (reviews == null)
        {
            return NotFound();
        }

        return Ok(reviews);
    }
}