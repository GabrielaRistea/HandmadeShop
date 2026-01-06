using HandmadeShop.Context;
using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HandmadeShop.Repositories;

public class ProductRepository : IProductRepository
{
    private ShopContext _context;
    public ProductRepository(ShopContext shopContext)
    {
        _context = shopContext;
    }
    public IEnumerable<Product> GetAll()
    {
        return _context.Products
            .Include(a => a.Artists)
            //.ThenInclude(a => a.Artist)
            .Include(c => c.Category)
            .Include(o => o.OrderItems)
            .Include(r => r.Reviews)
            .Include(w => w.Wishlists)
            .ToList();
    }

    public List<Artist> GetAllArtist()
    {
        return _context.Artists.ToList();
    }
    public List<Review> GetAllReviews()
    {
        return _context.Reviews.ToList();
    }
    public List<OrderItem> GetAllOrderItems()
    {
        return _context.OrderItems.ToList();
    }
    /*public List<WishlistProduct> GetAllWishlistProducts() 
    {
        return _context.WishlistProducts.ToList();
    }*/
    public Product GetById(int id)
    {
        return _context.Products
            .Include(a => a.Artists)
            //.ThenInclude(a => a.Artist)
            .Include(c => c.Category)
            .Include(o => o.OrderItems)
            .Include(r => r.Reviews)
            .Include(w => w.Wishlists).FirstOrDefault(p => p.ProductID == id);
    }
    public void Save()
    {
        _context.SaveChanges();
    }

    public bool ProductExists(int id)
    {
        return _context.Products.Any(p => p.ProductID == id);
    }
    public void Update(Product product)
    {
        _context.Products.Update(product);
    }
    public List<Category> GetAllCategories()
    {
        return _context.Categories.ToList();
    }
    public Product GetByIdWithRelatedEntities(int id)
    {
        return _context.Products.Include(c => c.Category)
               
            .FirstOrDefault(m => m.ProductID == id);
    }
    public void Create(Product product)
    {
        _context.Products.Add(product);
    }
        public void Create(Product product, List<int> artistIds)
        {
            var arttist = _context.Artists.Where(a => artistIds.Contains(a.ArtistID))
                .ToList();
            
            product.Artists = arttist;
            _context.Products.Add(product);
        }


    public void Delete(Product product)
    {
        _context.Products.Remove(product);
    }

    public List<Product> GetProductByCategory(int id)
    {
        return _context.Products.Include(p => p.Artists)
            .Include(p => p.Category)
            .Where(p => p.CatogoryId == id).ToList();
    }

    public List<Product> GetProductByArtist(int id)
    {
        return _context.Products.Include(p => p.Category)
            .Include(p => p.Artists)
            .Where(p => p.Artists.Any(a => a.ArtistID == id))
            .ToList();
    }
    
    public IEnumerable<Product> GetAllSortedByPrice(bool ascending = true)
    {
        var query = _context.Products
            .Include(a => a.Artists)
            .Include(c => c.Category)
            .AsQueryable();

        if (ascending)
        {
            return query.OrderBy(p => p.Price).ToList();
        }
        else
        {
            return query.OrderByDescending(p => p.Price).ToList();
        }
    }
}