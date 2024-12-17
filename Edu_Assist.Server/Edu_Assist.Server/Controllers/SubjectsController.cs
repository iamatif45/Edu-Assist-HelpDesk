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
        public async Task<ActionResult<IEnumerable<Subject>>> Get()
        {
            return Ok(await _subjectRepo.GetAll());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> Get(int id)
        {
            var subject = await _subjectRepo.GetSubjectById(id);
            if (subject == null)
            {
                return NotFound();
            }
            return Ok(subject);
        }
        [HttpPost]
        public async Task<ActionResult<Subject>> Post([FromBody] Subject subject)
        {
            await _subjectRepo.Add(subject);
            return CreatedAtAction(nameof(Get), new { id = subject.SubjectId }, subject);
        }
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
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _subjectRepo.DeleteById(id);
            return NoContent();
        }
    }
}