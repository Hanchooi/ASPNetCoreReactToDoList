using System.ComponentModel.DataAnnotations;

namespace aspnetserver.Data
{
    internal sealed class Task
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100000)]
        public string Content { get; set; } = string.Empty;
    }
}
