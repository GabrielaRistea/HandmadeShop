using HandmadeShop.Models;
using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HandmadeShop.Controllers;

[ApiController]
[Route("[controller]")]
public class ArtistController : ControllerBase
{
    private readonly IArtistService _artistService;
    public ArtistController(IArtistService artistService)
    {
        _artistService = artistService;
    }
    [HttpGet]
    public IActionResult GetAll()
    {
        var artist = _artistService.GetAllArtists();
        return Ok(artist);
    }
    [HttpGet("{id}")]
    public IActionResult GetById(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var artist = _artistService.GetArtistById(id.Value);

        if (artist == null)
        {
            return NotFound();
        }

        return Ok(artist);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Artist artist)
    {
        var artists = _artistService.GetAllArtists();

        await _artistService.AddArtistAsync(artist);
        return CreatedAtAction(nameof(GetById), new { id = artist.ArtistID }, artist);

    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> EditAsync(int id, [FromBody] Artist artist)
    {
        if (id != artist.ArtistID)
        {
            return BadRequest();
        }
        
        await _artistService.UpdateArtistAsync(artist);
        
        return NoContent();

    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var artist = _artistService.GetArtistById(id);
        if (artist != null)
        {
            _artistService.DeleteArtist(id);
        }
        return NoContent();
    }
}