using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalrPoc.Hubs
{
    public class CoffeeHub : Hub
    {
      public async Task SendMessage(string user, string message)
      {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
      }
  }
}
