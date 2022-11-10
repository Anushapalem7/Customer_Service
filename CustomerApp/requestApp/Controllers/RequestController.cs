using ConsulApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace requestApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class requestController : ControllerBase
    {
        CustomerServiceContext db = new CustomerServiceContext();
        [HttpGet]
        public IEnumerable<requestDto> Get(string id)
        {
            IEnumerable<Request> reqs = db.Requests.Where(x => x.AssignedTo == id).ToList();
            requestDto dt = new requestDto();
            List<requestDto> res = new List<requestDto>();
            foreach (Request re in reqs)
            {
                var reqBy = db.Customers.Where(x => x.Id.ToString() == re.RequestedBy).FirstOrDefault();
                var assTo = db.Customers.Where(x => x.Id.ToString() == re.AssignedTo).FirstOrDefault();
                dt.Id = re.Id;
                dt.Title = re.Title;
                dt.ReqType = re.ReqType;
                dt.RequestDate = re.RequestDate;
                dt.RequestedBy = re.RequestedBy;
                dt.RequestedByName = reqBy.Name;
                dt.AssignedTo = re.AssignedTo;
                dt.AssignedToName = assTo.Name;
                dt.ReuestDetails = re.ReuestDetails;
                dt.Status = re.Status;
                res.Add(dt);
                dt = new requestDto();
            }
            return res;
        }

        [HttpGet]
        [Route("GetPending")]
        public IEnumerable<requestDto> GetPending(string id)
        {
            
            IEnumerable < Request > reqs = db.Requests.Where(x => x.RequestedBy == id).ToList();
            if (reqs.Count() > 0)
            {
                requestDto dt = new requestDto();
                List<requestDto> res = new List<requestDto>();
                foreach (Request re in reqs)
                {
                    var reqBy = db.Customers.Where(x => x.Id.ToString() == re.RequestedBy).FirstOrDefault();
                    var assTo = db.Customers.Where(x => x.Id.ToString() == re.AssignedTo).FirstOrDefault();
                    dt.Id = re.Id;
                    dt.Title = re.Title;
                    dt.ReqType = re.ReqType;
                    dt.RequestDate = re.RequestDate;
                    dt.RequestedBy = re.RequestedBy;
                    dt.RequestedByName = reqBy.Name;
                    dt.AssignedTo = re.AssignedTo;
                    dt.AssignedToName = assTo.Name;
                    dt.ReuestDetails = re.ReuestDetails;
                    dt.Status = re.Status;
                    res.Add(dt);
                    dt = new requestDto();
                }
                return res;
            }
            else return null;

        }
        

        [HttpPost]
        public IActionResult Post([FromBody] Request request)
        {
            if (request.Title != null&& request.Title!="" && request.RequestDate!=null)
            {
                db.Requests.Add(request);
                db.SaveChanges();
                var response = new { Status = "Success" };
                return Ok(response);
            }
            else
            {
                var response = new { Status = "Fail" };
                return BadRequest(response);

            }
        }
        [HttpPut]
        public IActionResult Put([FromBody] Request r){


            if (r.Id != 0 &&r.Title!=""&&r.Title!=null) {
                db.Requests.Update(r);
                Request req = db.Requests.Where(x => x.Id == r.Id).FirstOrDefault();

                if (req != null)
                {
                    db.SaveChanges();
                    var response = new { Status = "Success" };
                    return Ok(response);
                }
                else
                {
                    var response = new { Status = "Fail" };
                    return BadRequest(response);

                }
            }
           

            else
            {
                var response = new { Status = "Fail" };
                return BadRequest(response);

            }

        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var data = db.Requests.Where(x => x.Id == id).FirstOrDefault();
            if (data != null) { 
            db.Requests.Remove(data);
             db.SaveChanges();
           
                var response = new { Status = "Success" };
                return Ok(response);
            }
            else {
                var response = new { Status = "Fail" };
                return BadRequest(response);
            }
           
        }

    }
}
