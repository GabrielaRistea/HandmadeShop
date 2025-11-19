using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HandmadeShop.Models;

public class ArtistProduct
{
    [Key]
    public int Id { get; set; }
    [ForeignKey(nameof(Artist))]
    public int ArtistId { get; set; }
    public Artist Artist { get; set; }

    [ForeignKey(nameof(Product))]
    public int ProductId { get; set; }
    public Product Product { get; set; }
}