using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace aspnetserver.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Task[] TasksToSeed = new Task[6];

            for (int i = 1; i <= 6; i++)
            {
                TasksToSeed[i - 1] = new Task
                {
                    TaskId = i,
                    Title = $"Task {i}",
                    Content = $"This is Task {i} and it has some very interesting content."
                };
            }

            modelBuilder.Entity<Task>().HasData(TasksToSeed);
        }
    }
}
