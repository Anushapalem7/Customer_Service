using CustomerApp.Controllers;
using NUnit.Framework;
using requestApp.Controllers;
using ConsulApp.Models;

namespace Nunit.Tests
{
    public class Tests
    {
        private requestController rc;
        [SetUp]
        public void Setup()
        {
            rc = new requestController();
        }

        [Test]
        public void Test1()
        {
            var result = rc.Get();
            Assert.IsNotNull(result);
        }
         [Test]
        public void Test2()
        {
            Request r = new Request();
            var result = rc.Put(r);
            Assert.IsNotNull(result);
        }
    }
}