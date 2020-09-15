using Microsoft.EntityFrameworkCore;

namespace IdentityProvider.Data
{
    // This idea is shamelessly stolen from https://github.com/JasonGT/NorthwindTraders/blob/master/Northwind.Persistence/NorthwindDbContextFactory.cs
    public class PlaylistManagerContextFactory : DesignTimeDbContextFactoryBase<ApplicationDbContext>
    {
        protected override ApplicationDbContext CreateNewInstance(DbContextOptions<ApplicationDbContext> options)
        {
            return new ApplicationDbContext(options);
        }
    }
}
