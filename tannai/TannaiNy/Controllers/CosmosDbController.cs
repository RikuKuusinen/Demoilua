using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using TannaiNy.Models;

namespace TannaiNy.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CosmosDbController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DocumentClient _client;
        private const string _dbName = "tannainy"; //tekemäsi DB:n nimi
        private const string _collectionName = "tannainy"; //tekemäsi
                                                           // CollectionName
                                                           //GET api/cosmosdb                                                   // GET api/cosmosdb
        [HttpGet]
        public string Ping()
        {
            return "nyt collection on tehty silloinkin kun sitä ei oltu jo etukäteen tehty";
        }

        [HttpGet]
        public async Task<ActionResult<Kayttaja>>
        GetByDocumentId(string documentId)
        {
            try
            {
                Kayttaja Kayttaja = await _client.ReadDocumentAsync<Kayttaja>(
                 UriFactory.CreateDocumentUri(_dbName, _collectionName, documentId));
                return Ok(Kayttaja);
            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return NotFound();
                }
            }
            return BadRequest();
        }

        [HttpGet]
        public ActionResult<List<Kayttaja>> GetByKayttajaId(int id)
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<Kayttaja> query = _client.CreateDocumentQuery<Kayttaja>(
            UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
            $"SELECT * FROM C WHERE C.KayttajaId = {id}",
            queryOptions);
            return Ok(query.ToList());
        }

        [HttpGet]
        public ActionResult<List<Kayttaja>> GetAllCustomers()
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<Kayttaja> query = _client.CreateDocumentQuery<Kayttaja>(
            UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
            $"SELECT * FROM C",
            queryOptions);
            return Ok(query.ToList());
        }
        [HttpGet]
        public ActionResult<List<Kayttaja>> Search(string where)
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<Kayttaja> query = _client.CreateDocumentQuery<Kayttaja>(
            UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
            $"SELECT * FROM C WHERE" + where,
            queryOptions);
            return Ok(query.ToList());
        }




        // POST api/cosmosdb
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] Kayttaja value)
        {
            Document document = await _client.CreateDocumentAsync(
            UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
            value);
            return Ok(document.Id);
        }
        [HttpDelete]

        public async Task<ActionResult<string>> Delete(string documentId)
        {
            try
            {
                await _client.DeleteDocumentAsync(
                    UriFactory.CreateDocumentUri(_dbName, _collectionName, documentId));
                return Ok($"Deleted document id {documentId}");
            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return NotFound();
                }
            }
            return BadRequest();
        }


        public CosmosDbController(IConfiguration configuration)
        {
            _configuration = configuration;
            var endpointUri =
            _configuration["ConnectionStrings:CosmosDbConnection:EndpointUri"];
            var key =
            _configuration["ConnectionStrings:CosmosDbConnection:PrimaryKey"];
            _client = new DocumentClient(new Uri(endpointUri), key);
            _client.CreateDatabaseIfNotExistsAsync(new Database
            {
                Id = _dbName
            }).Wait();
            // tässä ei aseteta kuinka suorituskykyisen collectionin me halutaan
            // siksi harjoituksessa se tehtiin porttaalin kautta, mutta tässä
            // varmistetaan että se on tehty
            // ellei, niin tehdään oletus-suorituskyvyllä (ja -hinnalla)
            _client.CreateDocumentCollectionIfNotExistsAsync(
            UriFactory.CreateDatabaseUri(_dbName),
            new DocumentCollection { Id = _collectionName });
        }
    }
}