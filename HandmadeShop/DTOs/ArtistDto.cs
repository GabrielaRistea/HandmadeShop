namespace HandmadeShop.DTOs;

public class ArtistDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public IFormFile? ImageFile { get; set; }
    public byte[]? ArtistImage { get; set; }
}