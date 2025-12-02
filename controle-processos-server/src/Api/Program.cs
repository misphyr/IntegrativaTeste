using Api.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
string? appSettings = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddOpenApi();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(appSettings));
builder.Services.AddCors();
builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

app.UseRouting();
app.UseCors(cors =>
{
    cors.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin();
});
app.MapControllers();

if (app.Environment.IsDevelopment() || app.Environment.EnvironmentName == "Production")
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

if (!app.Environment.EnvironmentName.Equals("Production", StringComparison.OrdinalIgnoreCase))
{
    app.UseHttpsRedirection();
}

app.Run();