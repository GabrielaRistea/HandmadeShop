using HandmadeShop.Context;
using HandmadeShop.Models;
using HandmadeShop.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HandmadeShop.Repositories;

public class ArtistRepository : IArtistRepository
{
    private ShopContext _context;
    public ArtistRepository(ShopContext shopContext)
    {
        _context = shopContext;
    }
    public IEnumerable<Artist> GetAll()
    {
        return _context.Artists.ToList();
    }
    public void Create(Artist artist)
    {
        _context.Artists.Add(artist);
    }
    public void Delete(Artist artist)
    {
        _context.Artists.Remove(artist);
    }
    public void Save()
    {
        _context.SaveChanges();
    }
    public bool ArtistExists(int id)
    {
        return _context.Artists.Any(a => a.ArtistID == id);
    }
    public void Update(Artist artist)
    {
        _context.Artists.Update(artist);
    }
    public Artist GetById(int id)
    {
        return _context.Artists.FirstOrDefault(a => a.ArtistID == id);
    }
    //public List<ArtistProduct> getAllArtistProducts()
    //{
    //   return _context.ArtistProducts.ToList();
    //}
}