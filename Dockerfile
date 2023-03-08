FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CubicIntersectionWeb/CubicIntersectionWeb.csproj", "CubicIntersectionWeb/"]
RUN dotnet restore "CubicIntersectionWeb/CubicIntersectionWeb.csproj"
COPY . .
WORKDIR "/src/CubicIntersectionWeb"
RUN dotnet build "CubicIntersectionWeb.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CubicIntersectionWeb.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CubicIntersectionWeb.dll"]
