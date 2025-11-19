using HandmadeShop.Models;

namespace HandmadeShop.Services.Interfaces;

public interface IArtistService
{
    List<Artist> GetAllArtists();
    Task AddArtistAsync(Artist artist);
    Task UpdateArtistAsync(Artist artist);
    void DeleteArtist(int id);
    bool ArtistExists(int id);
    Artist GetArtistById(int id);
    List<ArtistProduct> getAllArtistProducts();
}