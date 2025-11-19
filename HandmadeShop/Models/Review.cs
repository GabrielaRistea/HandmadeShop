using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HandmadeShop.Models;

public class Review
{
    [Key]
    public int ReviewID { get; set; }
    public string Comm { get; set; }
    public float Rating { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    public User User { get; set; }
    [ForeignKey(nameof(Product))]
    public int ProductId { get; set; }
    public Product Product { get; set; }
}