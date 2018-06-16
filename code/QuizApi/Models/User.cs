using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizApi.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string AnsweredQuestions { get; set; }
        public int Wins { get; set; }
        public int Loses { get; set; }
        public int SessionId { get; set; }
        public Session Session { get; set; }
    }
}