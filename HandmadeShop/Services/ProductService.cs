using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Repositories.Interfaces;
using HandmadeShop.Services.Interfaces;

namespace HandmadeShop.Services;

public class ProductService : IProductService
{
    private IProductRepository _productRepository;
    public ProductService(IProductRepository productRepository) 
    {
        _productRepository = productRepository;
    }
    public Product GetProductById(int id)
    {
        return _productRepository.GetById(id);
    }
    public async Task AddProductAsync(ProductDto productDto)
    {
        if (productDto.ImageFile != null && productDto.ImageFile.Length > 0)
        {
            using (var ms = new MemoryStream())
            {
                await productDto.ImageFile.CopyToAsync(ms);
                productDto.ProductImage = ms.ToArray();
            }
        }

        var newProduct = new Product()
        {
            ProductID = 0,
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            Stock = productDto.Stock,
            ImageFile = productDto.ImageFile,
            ProductImage = productDto.ProductImage,
            Artists = new List<Artist>(),
            CatogoryId = productDto.Category
        };
        
        //if (productDto.Artists?.ToList() is null)
        //{
          //  _productRepository.Create(newProduct);

        //}
        //else
        //{
            _productRepository.Create(newProduct, productDto.Artists?.ToList() ?? new List<int>());
        //}
        _productRepository.Save();
    }
    public async Task UpdateProductAsync(ProductDto productDto)
    {
        using var ms = new MemoryStream();

        if (productDto.ImageFile != null && productDto.ImageFile.Length > 0)
        {
            await productDto.ImageFile.CopyToAsync(ms);
            productDto.ProductImage = ms.ToArray();
        }
        var newProduct = new Product()
        {
            ProductID = productDto.Id,
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            Stock = productDto.Stock,
            ImageFile = productDto.ImageFile,
            ProductImage = productDto.ProductImage,
            Artists = new List<Artist>(),
            CatogoryId = productDto.Category,
        };
        _productRepository.Update(newProduct);
        _productRepository.Save();
    }
    public void DeleteProduct(int id)
    {
        var product = _productRepository.GetById(id);
        if (product != null)
        {
            _productRepository.Delete(product);
            _productRepository.Save();
        }
    }
    public bool ProductExists(int id)
    {
        return _productRepository.ProductExists(id);
    }
    public Product GetProductAndRelatedById(int id)
    {
        return _productRepository.GetByIdWithRelatedEntities(id);
    }
    public List<Product> GetAllProducts()
    {
        return _productRepository.GetAll().ToList();
    }
    public List<Artist> GetAllArtists()
    {
        return _productRepository.GetAllArtist().ToList();
    }
    public List<Category> GetAllCategories()
    {
        return _productRepository.GetAllCategories().ToList();
    }
    public List<Review> GetAllReviews()
    {
        return _productRepository.GetAllReviews().ToList();
    }
    public List<OrderItem> GetAllOrderItems()
    {
        return _productRepository.GetAllOrderItems().ToList();
    }
    /*public List<WishlistProduct> GetAllWishlistProducts()
    {
        return _productRepository.GetAllWishlistProducts().ToList();
    }*/

    public List<Product> searchProduct(string name)
    {
        var product = _productRepository.GetAll();
        
            product = product.Where(p => p.Name != null ? p.Name.Contains(name) : true).ToList();
        
        return product.ToList();
    }

    public async Task<List<ProductDto>> ProductsByCategory(int id)
    {
        var products = _productRepository.GetProductByCategory(id);
        return products.Select(p => new ProductDto 
        {
            Id = p.ProductID,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            ProductImage = p.ProductImage,
            ImageFile = p.ImageFile,
            Category = p.CatogoryId,
            CategoryName = p.Category?.Name ?? "Uncategorized",
            Artists = p.Artists?.Select(a => a.ArtistID).ToList(),
            ArtistNames = p.Artists?.Select(a => a.Name ).ToList() 
        }).ToList();
    }

    public async Task<List<ProductDto>> ProductsByArtist(int id)
    {
        var products = _productRepository.GetProductByArtist(id);
        return products.Select(p => new ProductDto 
        {
            Id = p.ProductID,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            ProductImage = p.ProductImage,
            ImageFile = p.ImageFile,
            Category = p.CatogoryId,
            CategoryName = p.Category?.Name ?? "Uncategorized",
            Artists = p.Artists?.Select(a => a.ArtistID).ToList(),
            ArtistNames = p.Artists?.Select(a => a.Name ).ToList() 
        }).ToList();
    }
    
}