using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizApi.Models
{
    public class Session
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool Available { get; set; }
        public List<User> Users { get; set; }
    }
}