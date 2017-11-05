using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace StOrder.Web.Controllers
{
    [Route("api/[controller]")]
    public class GrafanaController : Controller
    {

        [HttpGet("[action]")]
        public async Task<IEnumerable<Dashboard>> Dashboards()
        {
            var client = new HttpClient();
            var streamTask = client.GetStreamAsync("http://play.grafana.org/api/search");
            var serializer = new DataContractJsonSerializer(typeof(List<Dashboard>));
            var boards = serializer.ReadObject(await streamTask) as List<Dashboard>;
            return boards;
        }
    }

    [DataContract]
    public class Dashboard
    {
        [DataMember(Name = "title")]
        public string Title { get; set; }
    }
}
