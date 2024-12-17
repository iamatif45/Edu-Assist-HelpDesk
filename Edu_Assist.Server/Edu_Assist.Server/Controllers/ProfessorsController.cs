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
    public class ProfessorsController : ControllerBase
    {
        private readonly IProfessorRepo _professorRepo;
        public ProfessorsController(IProfessorRepo professorRepo)
        {
            _professorRepo = professorRepo;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Professor>>> Get()
        {
            return Ok(await _professorRepo.GetAll());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Professor>> Get(int id)
        {
            var professor = await _professorRepo.GetProfessorById(id);
            if (professor == null)
            {
                return NotFound();
            }
            return Ok(professor);
        }
        [HttpPost]
        public async Task<ActionResult<Professor>> Post([FromBody] Professor professor)
        {
            await _professorRepo.Add(professor);
            return CreatedAtAction(nameof(Get), new { id = professor.ProfessorId }, professor);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Professor>> Put(int id, [FromBody] Professor professor)
        {
            if (id != professor.ProfessorId)
            {
                return BadRequest();
            }
            await _professorRepo.Update(professor);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _professorRepo.DeleteById(id);
            return NoContent();
        }
    }
}