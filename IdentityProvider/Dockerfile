# the image has to be built by running docker build from the root directory (one up)
# with this command: docker build -t identityprovider -f .\IdentityProvider\Dockerfile .

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["IdentityProvider/IdentityProvider.csproj", "IdentityProvider/"]
RUN dotnet restore "IdentityProvider/IdentityProvider.csproj"
COPY . .
WORKDIR "/src/IdentityProvider"
RUN dotnet build "IdentityProvider.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IdentityProvider.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IdentityProvider.dll"]
