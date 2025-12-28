using HandmadeShop.Models;

namespace HandmadeShop.Repositories.Interfaces;

public interface IProductRepository
{
    IEnumerable<Product> GetAll();
    Product GetById( int id);
    bool ProductExists (int id);
    void Create (Product product);
    void Create (Product product, List<int> artistIds);
    
    void Update (Product product);
    void Delete (Product product);
    void Save();
    List<Artist> GetAllArtist();
    //List<Category> GetProductsByCategory(int categoryId);
    List<Review> GetAllReviews();
    List<OrderItem> GetAllOrderItems();
    //public List<WishlistProduct> GetAllWishlistProducts();
    public Product GetByIdWithRelatedEntities(int id);
    List<Category> GetAllCategories();
    List<Product> GetProductByCategory(int id);
    List<Product> GetProductByArtist(int id);
}