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
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectRepo _subjectRepo;
        public SubjectsController(ISubjectRepo subjectRepo)
        {
            _subjectRepo = subjectRepo;
        }
        [HttpGet]
        [Authorize(Roles ="Admin,Staff")]
        public async Task<ActionResult<IEnumerable<Subject>>> Get()
        {
            return Ok(await _subjectRepo.GetAll());
        }
        [HttpGet("{id}")]

        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<Subject>> Get(int id)
        {
            var subject = await _subjectRepo.GetSubjectById(id);
            if (subject == null)
            {
                return NotFound();
            }
            return Ok(subject);
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpPost]
        public async Task<ActionResult<Subject>> Post([FromBody] Subject subject)
        {
            await _subjectRepo.Add(subject);
            return CreatedAtAction(nameof(Get), new { id = subject.SubjectId }, subject);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Subject>> Put(int id, [FromBody] Subject subject)
        {
            if (id != subject.SubjectId)
            {
                return BadRequest();
            }
            await _subjectRepo.Update(subject);
            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _subjectRepo.DeleteById(id);
            return NoContent();
        }
    }
}