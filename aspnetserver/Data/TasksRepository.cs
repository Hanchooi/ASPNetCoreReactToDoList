using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace aspnetserver.Data
{
    internal static class TasksRepository
    {
        internal async static Task<List<Task>> GetTasksAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Tasks.ToListAsync();
            }
        }

        internal async static Task<Task> GetTaskByIdAsync(int taskId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Tasks.FirstOrDefaultAsync(Task => Task.TaskId == taskId);
            }
        }

        internal async static Task<bool> CreateTaskAsync(Task taskToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Tasks.AddAsync(taskToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdateTaskAsync(Task taskToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Tasks.Update(taskToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DeleteTaskAsync(int taskId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Task TaskToDelete = await GetTaskByIdAsync(taskId);

                    db.Remove(TaskToDelete);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}
