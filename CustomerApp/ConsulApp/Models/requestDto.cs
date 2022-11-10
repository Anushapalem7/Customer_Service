using System;
using System.Collections.Generic;
using System.Text;

namespace ConsulApp.Models
{
   public class requestDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ReuestDetails { get; set; }
        public string ReqType { get; set; }
        public string RequestedBy { get; set; }
        public string AssignedTo { get; set; }
        public string Status { get; set; }
        public string RequestDate { get; set; }
        public string RequestedByName { get; set; }
        public string AssignedToName { get; set; }
    }
}
