using System.ComponentModel.DataAnnotations;

namespace HandmadeShop.Models;

public class UserRole
{
    [Key]
    public int Id { get; set; }
    public string Type { get; set; }
    public ICollection<User> Users { get; set; }
}