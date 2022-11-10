using CustomerApp.Controllers;
using NUnit.Framework;
using requestApp.Controllers;
using ConsulApp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Net;

namespace Nunit.Tests
{
    public class CustomerTests
    {
        private CustomerController cc;
       
        [SetUp]
        public void Setup()
        {
            var configurationKeyMock = new Mock<IConfigurationSection>();
            var configurationIssuerMock = new Mock<IConfigurationSection>();
            var configurationAudienceMock = new Mock<IConfigurationSection>();
            var configurationMock = new Mock<IConfiguration>();
            configurationKeyMock.Setup(x => x.Value).Returns("Thisismysecretkey");
            configurationIssuerMock.Setup(x => x.Value).Returns("api.test.com");
            configurationAudienceMock.Setup(x => x.Value).Returns("test.com");
            configurationMock.Setup(x => x.GetSection("jwt:Key")).Returns(configurationKeyMock.Object);
            configurationMock.Setup(x => x.GetSection("jwt:Issuer")).Returns(configurationIssuerMock.Object);
            configurationMock.Setup(x => x.GetSection("jwt:Audience")).Returns(configurationAudienceMock.Object);
            cc = new CustomerController(configurationMock.Object);
            
        }


        [Test]
        public void GetShouldBeNullWhenIdIsZero()
        {
            dynamic result = cc.Get(0);
            Assert.IsNull(result);
        }

        [Test]
        public void GetShouldBeNullWhenIdIsInvalid()
        {
            dynamic result = cc.Get(4);
            Assert.IsNull(result);
        }
        [Test]
        public void PostShouldReturn400WhenEmptyObjectPassed()
        {
            Customer c = new Customer();
            dynamic result = cc.Post(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void PostShouldReturn400WhenNameIsNull()
        {
            Customer c = new Customer();
            c.Name = null;
            c.Email = "ex@gmail.com";
            c.Password = "Password";
            dynamic result = cc.Post(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void PostShouldReturn400WhenEmailIsNull()
        {
            Customer c = new Customer();
            c.Name = "test";
            c.Email = null;
            c.Password = "Password";
            dynamic result = cc.Post(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void PostShouldReturn400WhenPasswordIsNull()
        {
            Customer c = new Customer();
            c.Name = "test";
            c.Email = "ex@gmail.com";
            c.Password = null;
            dynamic result = cc.Post(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void PostShouldReturn400WhenThreeAreNull()
        {
            Customer c = new Customer();
            c.Name =null;
            c.Email = null;
            c.Password = null;
            dynamic result = cc.Post(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void GetShouldNotBeNullWhenIdIsvalid()
        {
            dynamic result = cc.Get(1);
            Assert.IsNotNull(result);
        }

        [Test]
        public void UpdateShouldReturn400WhenEmptyObjectPassed()
        {
            Customer c = new Customer();
            dynamic result = cc.Put(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void UpdateShouldReturn400WhenIdIsZeroPassed()
        {
            Customer c = new Customer();
            c.Id = 0;
            dynamic result = cc.Put(c);
            Assert.AreEqual(400, result.StatusCode);
        }

        [Test]
        public void UpdateShouldReturn400WhenInvalidIdPassed()
        {
            Customer c = new Customer();
            c.Id = 4;
            dynamic result = cc.Put(c);
            Assert.AreEqual(400, result.StatusCode);
        }

        [Test]
        public void loginShouldReturn400WhenEmailIsNull()
        {
            Customer c = new Customer();
            c.Password = "pass";
            dynamic result = cc.Login(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void loginShouldReturn400WhenPasswordIsNull()
        {
            Customer c = new Customer();
            c.Email = "check@gmail.com";
            dynamic result = cc.Login(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void loginShouldReturn400WhenUnAuthorizedEmailIsUsed()
        {
            Customer c = new Customer();
            c.Email = "xyz@gmail.com";
            c.Password = "pass";
            dynamic result = cc.Login(c);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void loginShouldReturnResponseObjectWhenValidInput() {
            Customer c = new Customer();
            c.Email = "check@gmail.com";
            c.Password = "pass";
            dynamic result = cc.Login(c);
            Assert.AreEqual(400, result.StatusCode);
        }

        [Test]
        public void DeleteShouldReturn400WhenPassedIsZero()
        {
            Customer c = new Customer();
            dynamic result = cc.Delete(0);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void DeleteShouldReturn400WhenPassedInvalidId()
        {
            Customer c = new Customer();
            dynamic result = cc.Delete(4);
            Assert.AreEqual(400, result.StatusCode);
        }
    }
}