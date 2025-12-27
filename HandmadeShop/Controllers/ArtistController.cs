using HandmadeShop.DTOs;
using HandmadeShop.Models;
using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Create([FromForm] ArtistDto artistDto)
    {
        var artists = _artistService.GetAllArtists();

        await _artistService.AddArtistAsync(artistDto);
        //return CreatedAtAction(nameof(GetById), new { id = artist.ArtistID }, artist);
        return Ok(artistDto);

    }
    
    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> EditAsync(int id, [FromForm] ArtistDto artistDto)
    {
        if (id != artistDto.Id)
        {
            return BadRequest();
        }
        
        await _artistService.UpdateArtistAsync(artistDto);
        
        return NoContent();

    }
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
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