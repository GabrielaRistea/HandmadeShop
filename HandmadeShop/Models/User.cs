using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HandmadeShop.Models;

public class User : IdentityUser
{
    //[Key]
    //public int UserID { get; set; }
    //public string? FirstName { get; set; }
    //public string? LastName { get; set; }
    //public string Email { get; set; }
    //public string PasswordHash { get; set; }
    //public string? Address { get; set; }
    //[ForeignKey(nameof(UserRole))]
    //public int UserRoleId { get; set; }
    //public UserRole UserRole { get; set; }
    public ICollection<Review>? Reviews { get; set; }
    public ICollection<Order>? Orders { get; set; }
    public Wishlist? Wishlist { get; set; }
}