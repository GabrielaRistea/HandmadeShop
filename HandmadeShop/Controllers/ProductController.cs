using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HandmadeShop.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : Controller
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
        var artistproduct = _productService.GetAllArtistProducts();
        var category = _productService.GetAllCategories();
        var reviews = _productService.GetAllReviews();
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
    public async Task<IActionResult> Create([FromForm] ProductDto productDto)
    {
        var products = mapProduct(productDto);

        await _productService.AddProductAsync(productDto);
        //return CreatedAtAction(nameof(GetById), new { id = artist.ArtistID }, artist);
        return Ok(productDto);

    }
    [HttpPut("{id}")]
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
            CategoryName = p.Category.Name,
            Artists = p.ArtistProducts?.Select(a => a.Artist?.ArtistID ?? 0).ToList() ?? [],
            ArtistNames = p.ArtistProducts?.Select(a => a.Artist?.Name ?? "").ToList() ?? []
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
            ArtistProducts = productDto.Artists.Select(a => new ArtistProduct() { ArtistId = a }).ToList(),
            CatogoryId = productDto.Category
        };
    }
}