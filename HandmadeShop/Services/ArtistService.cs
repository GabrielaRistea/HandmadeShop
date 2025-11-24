using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Repositories.Interfaces;
using HandmadeShop.Services.Interfaces;

namespace HandmadeShop.Services;

public class ArtistService : IArtistService
{
    private IArtistRepository _artistRepository;
    public ArtistService(IArtistRepository artistRepository)
    {
        _artistRepository = artistRepository;
    }
    public List<Artist> GetAllArtists()
    {
        return _artistRepository.GetAll().ToList();
    }
    public async Task AddArtistAsync(ArtistDto artistDto)
    {
        if (artistDto.ImageFile != null && artistDto.ImageFile.Length > 0)
        {
            using (var ms = new MemoryStream())
            {
                await artistDto.ImageFile.CopyToAsync(ms);
                artistDto.ArtistImage = ms.ToArray();
            }
        }

        var newArtist = new Artist
        {
            ArtistID = artistDto.Id,
            Name = artistDto.Name,
            Description = artistDto.Description,
            ImageFile = artistDto.ImageFile,
            ArtistImage = artistDto.ArtistImage
        };
        _artistRepository.Create(newArtist);
        _artistRepository.Save();
    }
    public async Task UpdateArtistAsync(ArtistDto artistDto)
    {
        using var ms = new MemoryStream();

        if (artistDto.ImageFile != null && artistDto.ImageFile.Length > 0)
        {
            await artistDto.ImageFile.CopyToAsync(ms);
            artistDto.ArtistImage = ms.ToArray();
        }
        var newArtist = new Artist
        {
            ArtistID = artistDto.Id,
            Name = artistDto.Name,
            Description = artistDto.Description,
            ImageFile = artistDto.ImageFile,
            ArtistImage = artistDto.ArtistImage
        };
        _artistRepository.Update(newArtist);
        _artistRepository.Save();
    }
    public void DeleteArtist(int id)
    {
        var artist = _artistRepository.GetById(id);
        if (artist != null)
        {
            _artistRepository.Delete(artist);
            _artistRepository.Save();
        }
    }
    public bool ArtistExists(int id)
    {
        return _artistRepository.ArtistExists(id);
    }
    public Artist GetArtistById(int id)
    {
        return _artistRepository.GetById(id);
    }
    //public List<ArtistProduct> getAllArtistProducts()
    //{
    //    return _artistRepository.getAllArtistProducts().ToList();
    //}
}