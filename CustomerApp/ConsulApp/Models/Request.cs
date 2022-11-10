using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ConsulApp.Models
{
    public class Request
    {
        [Key]
        public int Id {get;set;}
        [Required]
        [MaxLength(50)]
        public string Title {get;set;}
        [Required]
        [MaxLength(200)]
        public string ReuestDetails { get;set;}
        [MaxLength(10)]
        public string ReqType { get; set; }
        
        [MaxLength(10)]
        public string RequestedBy { get; set; }
        [MaxLength(10)]
        public string AssignedTo { get; set; }
        [MaxLength(10)]
        public string Status { get; set; }
      
        public string RequestDate { get; set; }

    }
}
