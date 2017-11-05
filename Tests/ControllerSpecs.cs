using System;
using Xunit;
using StOrder.Web.Domain;
using StOrder.Web.Data;
using StOrder.Web.Controllers;
using Web.Controllers;
using Microsoft.Extensions;
using Microsoft.Extensions.Options;
using Machine.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace Tests
{
    public class ControllerSpecs1
    {
        [Fact]
        public void CreateOrder()
        {
            var options = new DbContextOptionsBuilder<OrderContext>()
              .UseInMemoryDatabase(databaseName: "create_order")
              .Options;

            Customer customer;
            Item item;
            Order order;
            using (var context = new OrderContext(options))
            {
                var controller = new CustomersController(context);
                customer = controller.Create(new CreateCustomer { Name = "customer" });
                customer.Name.ShouldEqual("customer");
            }


            using (var context = new OrderContext(options))
            {
                var controller = new ItemsController(context);
                item = controller.Create(new CreateItem { Name = "item" });
                item.Name.ShouldEqual("item");

            }

            using (var context = new OrderContext(options))
            {
                var controller = new OrdersController(context);
                order = controller.Create(new CreateOrder { CustomerId = customer.Id });
                order.Customer.Name.ShouldEqual(customer.Name);
            }

            using (var context = new OrderContext(options))
            {
                var controller = new OrdersController(context);
                order = controller.GetById(order.Id);
                order.Customer.Name.ShouldEqual(customer.Name);
            }

            // using (var context = new OrderContext(options))
            // {
            //     var controller = new OrdersController(context);
            //     order = controller.Update(new CreateOrder { CustomerId = customer.Id });
            //     order.Customer.Name.ShouldEqual(customer.Name);
            // }

        }

    }

}
