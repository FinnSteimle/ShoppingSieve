var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddHttpClient("ProductClient", client =>
{
    client.DefaultRequestHeaders.UserAgent.ParseAdd("ShoppingSieveMobile/1.0 (iOS; Firefox; dev-contact@shoppingsieve.app)");
    client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
});

var app = builder.Build();

app.UseCors();

app.MapGet("/api/product/{barcode}", async (string barcode, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("ProductClient");

    // Try Swiss Open Food Facts API (v0)
    var response = await client.GetAsync($"https://ch.openfoodfacts.org/api/v0/product/{barcode}.json");
    if (!response.IsSuccessStatusCode)
    {
        // Fallback to World Open Food Facts
        response = await client.GetAsync($"https://world.openfoodfacts.org/api/v0/product/{barcode}.json");
    }

    if (!response.IsSuccessStatusCode)
    {
        return Results.NotFound(new { message = $"Product lookup failed (HTTP {(int)response.StatusCode})" });
    }

    var json = await response.Content.ReadFromJsonAsync<System.Text.Json.Nodes.JsonObject>();
    int status = json?["status"]?.GetValue<int>() ?? 0;

    if (status != 1)
    {
        return Results.NotFound(new { message = $"Product not found for barcode {barcode}" });
    }

    var productNode = json?["product"];
    if (productNode == null)
    {
        return Results.NotFound(new { message = "Product details missing in catalog." });
    }

    string productName = productNode["product_name_de"]?.ToString()
                      ?? productNode["product_name"]?.ToString() 
                      ?? productNode["product_name_en"]?.ToString() 
                      ?? productNode["abbreviated_product_name"]?.ToString()
                      ?? "Unknown Product";

    string brand = productNode["brands"]?.ToString() ?? "";
    if (!string.IsNullOrEmpty(brand) && !productName.Contains(brand, StringComparison.OrdinalIgnoreCase))
    {
        productName = $"{brand} - {productName}";
    }

    string ingredients = productNode["ingredients_text_de"]?.ToString() 
                      ?? productNode["ingredients_text"]?.ToString() 
                      ?? productNode["ingredients_text_fr"]?.ToString() 
                      ?? productNode["ingredients_text_en"]?.ToString() 
                      ?? "Ingredients list unavailable for this barcode.";

    return Results.Ok(new ProductResponse(productName, ingredients));
});

app.Run();

record ProductResponse(string ProductName, string Ingredients);
