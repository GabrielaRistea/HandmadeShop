using System.Security.Claims;
using HandmadeShop.DTOs;
using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HandmadeShop.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class HistoryOrdersController : Controller
{
    private readonly IOrderService _orderService;
    public HistoryOrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }
    
    [HttpGet("my-orders")]
    public async Task<IActionResult> GetMyOrders()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var orders = await _orderService.GetUserOrdersAsync(userId);
        return Ok(orders);
    }

    [Authorize(Roles = "admin")]
    [HttpGet("all-orders")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _orderService.GetAllOrdersForAdminAsync();
        return Ok(orders);
    }
    
    [Authorize(Roles = "admin")]
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        var success = await _orderService.UpdateOrderStatusAsync(id, dto.NewStatus);
    
        if (!success) 
        {
            return NotFound(new { message = "Comanda nu a fost găsita." });
        }
    
        return Ok(new { message = "Statusul a fost actualizat cu succes!" });
    }
}