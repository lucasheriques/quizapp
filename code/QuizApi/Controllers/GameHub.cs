using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace QuizApi.Controllers
{
    public class GameHub : Hub
    {
        public async Task Send(int id, string nome, int wins, int loses)
        {
            await Clients.All.SendAsync("UpdateUser", id, nome, wins, loses);
        }
        
        public async Task StartGame()
        {
            await Clients.All.SendAsync("StartedGame");
        }
    }
}
