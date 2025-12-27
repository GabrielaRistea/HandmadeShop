using HandmadeShop.Context;
using HandmadeShop.Repositories;
using HandmadeShop.Repositories.Interfaces;
using HandmadeShop.Services;
using HandmadeShop.Models;
using HandmadeShop.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Models;

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
        //builder.Services.AddSwaggerGen();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "eShop API", Version = "v1" });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Enter your JWT token like: Bearer <token>"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                            { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                    },
                    Array.Empty<string>()
                }
            });
        });
       
        
        
        builder.Services.AddAuthorization();
                builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
        
                builder.Services.AddIdentityCore<User>()
                    .AddRoles<IdentityRole>()
                    .AddEntityFrameworkStores<ShopContext>()
                    .AddApiEndpoints();
        
        builder.Services.AddDbContext<ShopContext>(
            optionsBuilder =>
                optionsBuilder.UseNpgsql(builder.Configuration.GetConnectionString("HandmadeShopDb"))
        );
        
        builder.Services.AddScoped<IArtistRepository, ArtistRepository>();
        builder.Services.AddScoped<IArtistService, ArtistService>();
        builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
        builder.Services.AddScoped<ICategoryService, CategoryService>();
        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddScoped<IProductService, ProductService>();

        var allowedOrigins = builder.Configuration.GetValue<string>("allowedOrigins")!.Split(",");
        
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy
                    .WithOrigins(allowedOrigins)
                    //.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            //app.MapOpenApi();
        }

        app.UseHttpsRedirection();

     
        
        app.UseCors();

        app.UseAuthorization();

        app.MapIdentityApi<User>();
        app.MapControllers();

        app.Run();
    }
}