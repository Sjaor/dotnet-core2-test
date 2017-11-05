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
    public class ItemsController : Controller
    {
        private OrderContext _context;

        public ItemsController(OrderContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IEnumerable<Item>> Index()
        {
            return await _context.Items.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        public Item GetById(long id)
        {
            return _context.Items.Single(x => x.Id == id);
        }

        [HttpPost]
        public Item Create([FromBody]CreateItem dto)
        {

            var item = new Item();

            item.Name = dto.Name;
            _context.Items.Add(item);
            _context.SaveChanges();
            return item;
        }
    }
    public class CreateItem
    {

        public string Name { get; set; }

    }
}
