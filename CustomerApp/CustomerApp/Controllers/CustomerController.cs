using ConsulApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        CustomerServiceContext db = new CustomerServiceContext();
        private IConfiguration _config;

        public CustomerController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public Customer Get(int id)
        {
            return db.Customers.Where(x => x.Id == id).FirstOrDefault();
        }


        //[HttpGet]
        //[Route("GetAll")]
        //public IEnumerable<Customer> Get()
        //{
        //    return db.Customers;
        //}

        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            if (customer.Name != null &&customer.Email!=null && customer.Password!=null)
            {
                try
                {
                    db.Customers.Add(customer);
                    db.SaveChanges();
                    var response = new { Status = "Success" };
                    return Ok(response);
                }
                catch (Exception e)
                {
                    return BadRequest(new { Exception = e });
                        }
            }
            else {
                var response = new { Status = "Fail" };
                return BadRequest(response);

            }
        }
        [HttpPut]
        public IActionResult Put([FromBody] Customer c)
        {
            if (c.Id != 0)
            {
                db.Customers.Update(c);
                Customer cus = db.Customers.Where(x => x.Id == c.Id).FirstOrDefault();
                if (cus != null)
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

        [HttpPost]
        [Route("login-user")]
        public IActionResult Login(Customer u)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(u, false);
            if (user != null)
            {
                try
                {
                    var tokenString = GenerateToken(user);
                    response = Ok(new { token = tokenString, userData = user });

                }
                catch (Exception e)
                {
                    return BadRequest(new { exception = e });
                }
            }
            else {
                response = BadRequest();
            }
            return response;
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var data = db.Customers.Where(x => x.Id == id).FirstOrDefault();
            if (data != null) 
            { 
                db.Customers.Remove(data);
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

        private Customer AuthenticateUser(Customer u, bool IsRegister)
        {
            if (IsRegister)
            {
                db.Customers.Add(u);
                return u;
            }
            else
            {
                if (db.Customers.Any(x => x.Email == u.Email && x.Password == u.Password))
                {
                    return db.Customers.Where(x => x.Email == u.Email && x.Password == u.Password).FirstOrDefault();
                }
                else
                {
                    return null;
                }
            }

        }

        private string GenerateToken(Customer u)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["jwt:Issuer"],
                _config["jwt:Audience"],
                null,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }



    }
}
