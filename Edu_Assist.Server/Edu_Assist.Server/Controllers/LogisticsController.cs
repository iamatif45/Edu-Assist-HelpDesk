using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogisticsController : ControllerBase
    {
        private readonly ILogisticsRepo _logisticRepo;
        public LogisticsController(ILogisticsRepo logisticRepo)
        {
            _logisticRepo = logisticRepo;
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Logistic>>> Get()
        {
            return Ok(await _logisticRepo.GetAll());
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Logistic>> Get(int id)
        {
            var logistic = await _logisticRepo.GetLogisticById(id);
            if (logistic == null)
            {
                return NotFound();
            }
            return Ok(logistic);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Logistic>> Post([FromBody] Logistic logistic)
        {
            await _logisticRepo.Add(logistic);
            return CreatedAtAction(nameof(Get), new { id = logistic.LogisticsId }, logistic);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Logistic>> Put(int id, [FromBody] Logistic logistic)
        {
            if (id != logistic.LogisticsId)
            {
                return BadRequest();
            }
            await _logisticRepo.Update(logistic);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _logisticRepo.DeleteById(id);
            return NoContent();
        }
    }
}