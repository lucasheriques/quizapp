using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizApi.Models
{
    public class Answer
    {
        public int Id { get; set; }
        [Required]
        public string Statement { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}