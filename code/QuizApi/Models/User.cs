using System;
using System.Collections.Generic;

namespace QuizApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AnsweredQuestions { get; set; }
        public int SessionId { get; set; }
        public Session Session { get; set; }
    }
}