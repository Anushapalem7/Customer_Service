using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ConsulApp.Models
{
   public class Category
    {
        [Key]
       public int Id { get; set; }
        [MaxLength(10)]
       public int Type { get; set; }
    }
}
