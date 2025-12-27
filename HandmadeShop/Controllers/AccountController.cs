using HandmadeShop.DTOs;
using HandmadeShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HandmadeShop.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : Controller
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    public AccountController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    { 
        if (!await _roleManager.RoleExistsAsync("User"))
        {
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }
    
        var user = new User
        {
            UserName = model.Email,
            Email = model.Email
        };
    
        var result = await _userManager.CreateAsync(user, model.Password);
    
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "user");
    
            return Ok(new { message = "Cont creat" });
        }
    
        return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
    }

    [HttpGet("user-info")]
    [Authorize] 
    public async Task<IActionResult> GetUserInfo()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new
        {
            email = user.Email,
            roles = roles
        });
    }
}