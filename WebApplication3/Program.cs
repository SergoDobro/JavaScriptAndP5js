using Microsoft.AspNetCore.Routing;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

//app.MapGet("/", async (context) =>
//{
//    var response = context.Response;
//    response.Headers.ContentLanguage = "ru-RU";
//    response.Headers.ContentType = "text/html; charset=utf-8";
//    response.Headers.Append("secret-id", "256");    // добавление кастомного заголовка 
//    if (context.Request.Query["login"] == "login"
//        && context.Request.Query["password"] == "password")
//    {
//        await response.WriteAsync(File.ReadAllText("pages/page.html"));
//    }
//    else
//    {
//        await response.WriteAsync(File.ReadAllText("pages/page.html"));
//    }
//    //response.Headers.ContentType = "image/JPEG; charset=utf-8"; text/javascript; charset=utf-8

//    //await response.WriteAsync("Pages\\133049648840641034.bmp");
//});
string mainDirectory = "pages/quadratic_tree_2";
var files = Directory.GetFiles(mainDirectory);
app.MapGet("/", async (context) =>
{
    var response = context.Response;
    response.Headers.ContentLanguage = "ru-RU";
    response.Headers.ContentType = "text/html; charset=utf-8";
    await response.WriteAsync(File.ReadAllText($"{mainDirectory}/page.html"));
});
foreach (var file in files)
{
    if (file.EndsWith(".js"))
    {
        Console.WriteLine(file.Split("\\").Last());
        app.MapGet($"/{file.Split("\\").Last()}", async (context) =>
        {
            var response = context.Response;
            response.Headers.ContentLanguage = "ru-RU";
            response.Headers.ContentType = "text/javascript; charset=utf-8";
            await response.WriteAsync(File.ReadAllText(file));
        });
    }
}
app.Run();