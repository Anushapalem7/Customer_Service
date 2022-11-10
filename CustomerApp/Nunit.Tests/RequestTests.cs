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
            var result = rc.Get("1");
            Assert.IsNotNull(result);
        }
        [Test]
        public void PostShouldReturn400WhenEmptyObjectPassed()
        {
            Request r = new Request();
            dynamic result = rc.Post(r);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void UpdateShouldReturn400WhenEmptyObjectPassed()
        {
            Request r = new Request();
            dynamic result = rc.Put(r);
            Assert.AreEqual(400,result.StatusCode);
        }
        [Test]
        public void GetPendingCountShouldBeZeroWhenIdIsZero()
        {
            Request r = new Request();
            dynamic result = rc.GetPending("0");
            Assert.IsNull(result);
        }
        [Test]
        public void GetPendingShouldNotBeNullWhenIdIsCorrect()
        {
            Request r = new Request();
            dynamic result = rc.GetPending("7");
            Assert.IsNotNull(result);
        }
        [Test]
        public void GetCountShouldNotBeNull()
        {
            Request r = new Request();
            dynamic result = rc.Get("15");
            Assert.IsNotNull(result);
        }
        [Test]
        public void GetCountShouldBeZeroWhenIdIsZero()
        {
            Request r = new Request();
            dynamic result = rc.Get("0");
            Assert.AreEqual(0, result.Count);
        }

        [Test]
        public void GetPendingCountShouldBe0IfWrongIdPassed()
        {
            Request r = new Request();
            dynamic result = rc.GetPending("15");
            Assert.IsNull(result);
        }
        [Test]
        public void GetPendingCountShouldBegreaterthan0IfCorrectIdPassed()
        {
            Request r = new Request();
            dynamic result = rc.GetPending("7");
            Assert.IsTrue(result.Count > 0);
        }
        [Test]
        public void GetCountShouldBegreaterthan0IfCorrectIdPassed()
        {
            Request r = new Request();
            dynamic result = rc.Get("9");
            Assert.IsTrue(result.Count > 0);
        }
        [Test]
        public void PostShouldReturn400WhenTitleisEmpty()
        {
            Request r = new Request();
            r.RequestDate = "2022-11-04";
            dynamic result = rc.Post(r);
            Assert.AreEqual(400, result.StatusCode);
        }

        [Test]
        public void PostShouldReturn400WhenTitleisInvalid()
        {
            Request r = new Request();
            r.Title ="";
            r.RequestDate = "2022-11-04";
            dynamic result = rc.Post(r);
            Assert.AreEqual(400, result.StatusCode);
        }

        [Test]
        public void PostShouldReturn400WhenDateisEmpty()
        {
            Request r = new Request();
            r.Title = "test title";
            dynamic result = rc.Post(r);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void PutShouldReturn400WhenTitleisEmpty()
        {
            Request r = new Request();
            r.Title = "";
            r.Id = 1;
            dynamic result = rc.Post(r);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void PutShouldReturn400WhenIdIsInvalid()
        {
            Request r = new Request();
            r.Title = "some";
            r.Id = 1;
            dynamic result = rc.Post(r);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void PutShouldReturn400WhenIdIsZero()
        {
            Request r = new Request();
            r.Title = "";
            r.Id = 42;
            dynamic result = rc.Post(r);
            Assert.AreEqual(400, result.StatusCode);
        }
        [Test]
        public void GetCountShouldBe0IfwrongIdPassed()
        {
            Request r = new Request();
            dynamic result = rc.Get("15");
            Assert.IsTrue(result.Count == 0);
        }
        [Test]
        public void GetPendingCountShouldBegreaterthan0IfManagerIdPassed()
        {
            Request r = new Request();
            dynamic result = rc.GetPending("9");
            Assert.IsTrue(result.Count > 0);
        }

        [Test]
        public void DeleteShouldReturn400WhenPassedIsZero()
        {
           
            dynamic result = rc.Delete(0);
            Assert.AreEqual(400, result.StatusCode);
        }

       
    }
}