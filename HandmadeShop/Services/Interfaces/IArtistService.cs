using HandmadeShop.DTOs;
using HandmadeShop.Models;

namespace HandmadeShop.Services.Interfaces;

public interface IArtistService
{
    List<Artist> GetAllArtists();
    Task AddArtistAsync(ArtistDto artistDto);
    Task UpdateArtistAsync(ArtistDto artistDto);
    void DeleteArtist(int id);
    bool ArtistExists(int id);
    Artist GetArtistById(int id);
    List<ArtistProduct> getAllArtistProducts();
    
}