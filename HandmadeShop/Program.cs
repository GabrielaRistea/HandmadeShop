using HandmadeShop.Context;
using HandmadeShop.Repositories;
using HandmadeShop.Repositories.Interfaces;
using HandmadeShop.Services;
using HandmadeShop.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HandmadeShop;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        //builder.Services.AddOpenApi();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        builder.Services.AddDbContext<ShopContext>(
            optionsBuilder =>
                optionsBuilder.UseNpgsql(builder.Configuration.GetConnectionString("HandmadeShopDb"))
        );
        
        builder.Services.AddScoped<IArtistRepository, ArtistRepository>();
        builder.Services.AddScoped<IArtistService, ArtistService>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            //app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}