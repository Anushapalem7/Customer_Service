using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ConsulApp.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
       
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(20)]
        public string Country { get; set; }
        [MaxLength(50)]
        public string State { get; set; }
        [MaxLength(100)]
        public string Address { get; set; }
        [Required]
        [MaxLength(50)]
        [Index(IsUnique = true)]

        public string Email { get; set; }

        [MaxLength(10)]
        public string PAN { get; set; }
        [MaxLength(10)]
        public string Phone { get; set; }
        public DateTime DOB { get; set; }
        [MaxLength(10)]
        public string PrimaryContact { get; set; }
        [Required]
        [MaxLength(20)]
        public string Password { get; set; }
        [MaxLength(10)]
        public string Role { get; set; }
    }
}
