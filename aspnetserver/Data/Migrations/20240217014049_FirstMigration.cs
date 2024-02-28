using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetserver.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    TaskId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.TaskId);
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Content", "Title" },
                values: new object[] { 1, "This is Task 1 and it has some very interesting content.", "Task 1" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Content", "Title" },
                values: new object[] { 2, "This is Task 2 and it has some very interesting content.", "Task 2" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Content", "Title" },
                values: new object[] { 3, "This is Task 3 and it has some very interesting content.", "Task 3" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Content", "Title" },
                values: new object[] { 4, "This is Task 4 and it has some very interesting content.", "Task 4" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Content", "Title" },
                values: new object[] { 5, "This is Task 5 and it has some very interesting content.", "Task 5" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Content", "Title" },
                values: new object[] { 6, "This is Task 6 and it has some very interesting content.", "Task 6" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
