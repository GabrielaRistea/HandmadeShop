using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HandmadeShop.Models;

public class Artist
{
    [Key]
    public int ArtistID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public byte[]? ArtistImage { get; set; }
    [DataType(DataType.Upload)]
    [DisplayName("Imagine")]
    [NotMapped]
    public IFormFile? ImageFile { get; set; }
    public ICollection<ArtistProduct> ArtistProducts { get; set; }
}