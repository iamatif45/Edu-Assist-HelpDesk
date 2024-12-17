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
    public class TicketLogsController : ControllerBase
    {
        private readonly ITicketLogRepo _ticketLogRepo;
        public TicketLogsController(ITicketLogRepo ticketLogRepo)
        {
            _ticketLogRepo = ticketLogRepo;
        }

        [Authorize(Roles ="Admin,Staff")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketLog>>> Get()
        {
            return Ok(await _ticketLogRepo.GetAll());
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketLog>> Get(int id)
        {
            var ticketlog = await _ticketLogRepo.GetTicketById(id);
            if (ticketlog == null)
            {
                return NotFound();
            }
            return Ok(ticketlog);
        }

        [Authorize(Roles = "Admin,Staff,Student")]

        [HttpGet("Ticketlog/{id}")]
        public async Task<ActionResult<TicketLog>> GetTicketlogbyTicketId(int id)
        {
            var ticketlog = await _ticketLogRepo.GetTicketLogByTicketId(id);
            if (ticketlog == null)
            {
                return NotFound();
            }
            return Ok(ticketlog);
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpPost]
        public async Task<ActionResult<TicketLog>> Post([FromBody] TicketLog ticketlog)
        {
            await _ticketLogRepo.Add(ticketlog);
            return CreatedAtAction(nameof(Get), new { id = ticketlog.LogId }, ticketlog);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpPut("{id}")]
        public async Task<ActionResult<TicketLog>> Put(int id, [FromBody] TicketLog ticketlog)
        {
            if (id != ticketlog.LogId)
            {
                return BadRequest();
            }
            await _ticketLogRepo.Update(ticketlog);
            return NoContent();
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _ticketLogRepo.DeleteById(id);
            return NoContent();
        }
    }
}