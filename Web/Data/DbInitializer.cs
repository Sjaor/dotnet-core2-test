using System;
using System.Linq;
using StOrder.Web.Domain;

namespace StOrder.Web.Data
{
    public static class DbInitializer
    {
        public static void Initialize(OrderContext context)
        {
            context.Database.EnsureCreated();

            if (context.Customers.Any())
            {
                return;
            }

            var customer = new Customer[]
                {
                new Customer{Name = "Sara"},
                new Customer{Name = "Vanja"},
                };
            foreach (Customer c in customer)
            {
                context.Customers.Add(c);
            }
            context.SaveChanges();
            
            var items = new Item[]
                {
                new Item{Name = "Vipp på rumpan", Price = 2},
                new Item{Name = "Boll", Price = 5},
                };
            foreach (Item i in items)
            {
                context.Items.Add(i);
            }
            context.SaveChanges();

        }
    }
}