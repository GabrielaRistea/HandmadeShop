using HandmadeShop.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HandmadeShop.Context;

public class ShopContext : IdentityDbContext<User>
{
    public ShopContext(DbContextOptions<ShopContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    //public DbSet<ArtistProduct> ArtistProducts { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<HistoryOrders>  HistoryOrders { get; set; }
    public DbSet<Review> Reviews { get; set; }
    //public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Wishlist> Wishlists { get; set; }
    public DbSet<WishlistProduct> WishlistProducts { get; set; }
    public DbSet<Artist> Artists { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}