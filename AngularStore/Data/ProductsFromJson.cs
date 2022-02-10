using AngularStore.Models;
using System.Text.Json;

namespace AngularStore.Data;

public static class ProductsFromJson
{
    public static Product[] ReadFile(string fileName)
    {
        var jsonContents = File.ReadAllText(fileName);
        return JsonSerializer.Deserialize<Product[]>(jsonContents, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }) ?? Array.Empty<Product>();
    }
}
