using HandmadeShop.Models;

namespace HandmadeShop.Repositories.Interfaces;

public interface IArtistRepository
{
    IEnumerable<Artist> GetAll();
    bool ArtistExists(int id);
    void Create(Artist artist);
    void Update(Artist artist);
    void Delete(Artist artist);
    void Save();
    Artist GetById(int id);
    List<ArtistProduct> getAllArtistProducts();
}