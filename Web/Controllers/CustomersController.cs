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
    public class CustomersController : Controller
    {

        private OrderContext _context;

        public CustomersController(OrderContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Customer>> Index()
        {
            return await _context.Customers.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        public Customer GetById(long id)
        {
            return _context.Customers.Single(x => x.Id == id);
        }

        [Route("{id}/orders")]
        [HttpGet]
        public async Task<IEnumerable<Order>> GetOrdersByCustomerId(long id)
        {

            return await _context.Orders.Where(x => x.Customer.Id == id)
            .Include(x => x.Customer)
            .Include(x => x.OrderLines)
            .AsNoTracking()
            .ToListAsync();
        }

        [HttpPost]
        public Customer Create([FromBody]CreateCustomer dto)
        {
            var customer = new Customer();
            customer.Name = dto.Name;
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return customer;
        }
    }

    public class CreateCustomer
    {
        public string Name { get; set; }

    }
}
