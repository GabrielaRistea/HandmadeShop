using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HandmadeShop.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IArtistService _artistService;
    private readonly ICategoryService _categoryService;
    public ProductController(IProductService productService, IArtistService artistService, ICategoryService categoryService)
    {
        _productService = productService;
        _artistService = artistService;
        _categoryService = categoryService;
    }
    [HttpGet]
    [ProducesResponseType(typeof(List<ProductDto>), StatusCodes.Status200OK)]
    public IActionResult GetAll()
    {
        var product = _productService.GetAllProducts().Select(p => mapProduct(p)).ToList();
        var artist = _productService.GetAllArtists();
        var category = _productService.GetAllCategories();
        var reviews = _productService.GetAllReviews();
        
        
        return Ok(product);
    }

    [HttpGet("by-product-name/{name}")]
    [ProducesResponseType(typeof(List<ProductDto>), StatusCodes.Status200OK)]
    public IActionResult SearchProduct(string name)
    {
        if (String.IsNullOrEmpty(name))
        {
            return NotFound();
        }
        var product = _productService.searchProduct(name).Select(p => mapProduct(p)).ToList();
        return Ok(product);
    }
    
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _productService.GetProductById(id);

        if (product == null)
            return NotFound();

        return Ok(mapProduct(product));
    }
    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Create([FromForm] ProductDto productDto)
    {
        var products = mapProduct(productDto);

        await _productService.AddProductAsync(productDto);
        //return CreatedAtAction(nameof(GetById), new { id = artist.ArtistID }, artist);
        return Ok(productDto);

    }

    [HttpGet("by-category-id/{categoryId}")]
    [ProducesResponseType(typeof(List<ProductDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProductsByCategory(int categoryId)
    {
        if (categoryId == null)
        {
            return NotFound();
        }
        var products = await _productService.ProductsByCategory(categoryId);
        return Ok(products);
    }
    
    [HttpGet("by-artist-id/{artistId}")]
    public async Task<IActionResult> GetProductsByArtist(int artistId) 
    {
        if (artistId == null)
        {
            return NotFound();
        }
        var products = await _productService.ProductsByArtist(artistId);
        return Ok(products);
    }    
    
    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> EditAsync(int id, [FromForm] ProductDto productDto)
    {
        if (id != productDto.Id)
        {
            return BadRequest();
        }
        var product = mapProduct(productDto);
        await _productService.UpdateProductAsync(productDto);
        
        return NoContent();

    }
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public IActionResult Delete(int id)
    {
        var product = _productService.GetProductById(id);
        if (product != null)
        {
            _productService.DeleteProduct(id);
        }
        return NoContent();
    }

    private ProductDto mapProduct(Product p)
    {
        return new ProductDto()
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
            Artists = p.Artists?.Select(a => a?.ArtistID ?? 0).ToList() ?? [],
            ArtistNames = p.Artists?.Select(a => a?.Name ?? "").ToList() ?? []
        };
    }

    private Product mapProduct(ProductDto productDto)
    {
        return new Product()
        {
            ProductID = productDto.Id,
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            Stock = productDto.Stock,
            ImageFile = productDto.ImageFile,
            ProductImage = productDto.ProductImage,
            Artists = new List<Artist>(),
            CatogoryId = productDto.Category
        };
    }
    
    [HttpGet("filter")]
    public async Task<IActionResult> GetProducts(string sortBy = "asc")
    {
        bool ascending = sortBy.ToLower() != "desc";

        var result = await _productService.GetSortedProductsAsync(ascending);

        if (result == null || result.Count == 0)
        {
            return NotFound("Nu s-au gasit produse.");
        }

        return Ok(result);
    }
}