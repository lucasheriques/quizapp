using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizApi.Models
{
    public class Question
    {
        public int Id { get; set; }
        
        [Required]
        public string Statement { get; set; }
        
        [Required]
        public string CorrectAnswer { get; set; }
        
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }
        
        public List<Answer> Alternatives { get; set; }
    }
}