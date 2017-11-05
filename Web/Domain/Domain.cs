using System.Collections.Generic;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;

namespace StOrder.Web.Domain
{
    public class Customer
    {
        public long Id { get; set; }
        public string Name { get; set; }

    }


    public class Item
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
    }

    public class Order
    {
        public long Id { get; set; }
        public Customer Customer { get; set; }
        public ICollection<OrderLine> OrderLines { get; set; }
    }

    public class OrderLine
    {
        public long Id { get; set; }
        public int Quantity { get; set; }
        public Item Item { get; set; }
    }
}