param([string]$Name)

dotnet ef migrations add $Name -o Persistence/Migrations