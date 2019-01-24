using System;
using Microsoft.AspNetCore.SignalR.Client;

namespace ConsoleClient
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Press a key to start listening!");
            Console.ReadLine();

            //similar to js
            var connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:41695/coffeeHub")
                .Build();

            //incoming function
            connection.On<Order>("NewOrder", (order) =>
            {
                Console.WriteLine($"Somebody ordered on {order.Product}");
            });

            connection.StartAsync().GetAwaiter().GetResult();

            Console.WriteLine("Listening....Read a key to quit");
            Console.ReadKey();


        }
    }

    public class Order
    {
        public string Product { get; set; }
        public string Size { get; set; }
    }
}
