using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StOrder.Web.Domain;
using StOrder.Web.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using System.Data;
using Microsoft.EntityFrameworkCore;


namespace Web.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private OrderContext _context;
        public OrdersController(OrderContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> Index()
        {
            return await _context.Orders.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        public Order GetById(long id)
        {
            return _context.Orders.Single(x => x.Id == id);
        }

        [HttpPost]
        public Order Create([FromBody]CreateOrder dto)
        {
            var order = new Order();
            order.Customer = _context.Customers.Single(x => x.Id == dto.CustomerId);
            _context.Orders.Add(order);
            return order;
        }

        [HttpPut]
        public Order Update([FromBody]UpdateOrder dto)
        {
            var order = GetById(dto.Id);
            _context.Orders.Update(order);
            return order;
        }
    }
    public class CreateOrder
    {
        public long CustomerId { get; set; }
    }

    public class UpdateOrder
    {
        public long Id { get; set; }
        IEnumerable<OrderLineDto> Orderlines { get; set; }
    }

    public class OrderLineDto
    {
        public long Id { get; set; }
        public long ItemId { get; set; }
        public int Quantity { get; set; }
    }
}
