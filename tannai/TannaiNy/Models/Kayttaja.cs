using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TannaiNy.Models
{
    public class Kayttaja
    {
        public int UserId { get; set; }
        public string NickName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ZipCode { get; set; }
        

        public override string ToString()
        {
            return $"Id:{UserId} Name:'{FirstName}' Saldo:{LastName}";
        }
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
        public static Kayttaja FromJson(string json)
        {
            return JsonConvert.DeserializeObject<Kayttaja>(json);
        }
    }
}
