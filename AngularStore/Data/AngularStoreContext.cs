#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AngularStore.Models;

namespace AngularStore.Data
{
    public class AngularStoreContext : DbContext
    {
        public AngularStoreContext (DbContextOptions<AngularStoreContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("Product");

            //For SQLite (doesn't support decimal natively), convert to double
            modelBuilder.Entity<Product>()
                .Property(e => e.Price)
                .HasConversion<double>();
        }
    }
}
