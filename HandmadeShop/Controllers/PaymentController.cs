using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HandmadeShop.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class PaymentController : Controller
{
    private readonly IOrderService _orderService;

    public PaymentController(IOrderService orderService)
    {
        _orderService = orderService;
    }
    
    [HttpPost("confirm")]
    public async Task<IActionResult> Confirm([FromQuery] string sessionId)
    {
        bool isSuccess = await _orderService.ConfirmPaymentAsync(sessionId);
        if (isSuccess)
        {
            return Ok(new { message = "Plata confirmata!" });
        }
        return BadRequest("Plata nu a putut fi verificata.");
    }
}