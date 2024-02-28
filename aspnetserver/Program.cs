using aspnetserver.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Task = aspnetserver.Data.Task;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.NET React To Do List", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NET React To Do List";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving a very simple To Do List.");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/get-all-tasks", async () => await TasksRepository.GetTasksAsync())
    .WithTags("Tasks Endpoints"); ;

app.MapGet("/get-task-by-id/{taskId}", async (int taskId) =>
{
    aspnetserver.Data.Task taskToReturn = await TasksRepository.GetTaskByIdAsync(taskId);

    if (taskToReturn != null)
    {
        return Results.Ok(taskToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Tasks Endpoints");


app.MapPost("/create-task", async (Task taskToCreate) =>
{
    bool createSuccessful = await TasksRepository.CreateTaskAsync(taskToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Tasks Endpoints");


app.MapPut("/update-task", async (Task taskToUpdate) =>
{
    bool updateSuccessful = await TasksRepository.UpdateTaskAsync(taskToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Tasks Endpoints");

app.MapDelete("/delete-task-by-id/{taskId}", async (int taskId) =>
{
    bool deleteSuccessful = await TasksRepository.DeleteTaskAsync(taskId);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Tasks Endpoints");

app.Run();
