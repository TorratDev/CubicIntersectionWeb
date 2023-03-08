using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using CubicIntersectionWeb.Pages;

namespace CubicIntersectionWeb;

public sealed class InterceptionService : IInterceptor
{
    private readonly IHttpClientFactory _httpClientFactory;

    public InterceptionService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<(bool areCollinding, double volume)> GetIntersection(Cubic cubic1, Cubic cubic2)
    {
        try
        {
            using var client = _httpClientFactory.CreateClient();

            client.BaseAddress = new Uri("http://localhost:8080/api/basic");

            var request = new CubicRequest(cubic1, cubic2);

            using var httpResponseMessage = await client.PostAsync("", JsonContent.Create(request));

            await using var stream = await httpResponseMessage.Content.ReadAsStreamAsync();

            var response = await JsonSerializer.DeserializeAsync<CubicResponse>(stream, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = false,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            return (response.AreTheyColliding, response.IntersectedVolume);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return (false, 0);
        }
    }
}