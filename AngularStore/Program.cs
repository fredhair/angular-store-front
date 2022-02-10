using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AngularStore.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AngularStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AngularStoreContext")));

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

//Seed Db with example data if the Db is empty
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        AngularStoreContext? context = services.GetRequiredService<AngularStoreContext>();
        context?.Database.EnsureCreated();
        if (!context?.Products.Any() ?? false)
        {
            //Create some example data in the DbContext
            AngularStore.Models.Product[] products = ProductsFromJson.ReadFile("./Data/products.json");
            context?.Products.AddRange(products);
            context?.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        throw;
    }
}

app.Run();
