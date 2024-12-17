using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseSubjectsController : ControllerBase
    {
        private readonly ICourseSubjectRepo _subjectRepo;
        public CourseSubjectsController(ICourseSubjectRepo subjectRepo)
        {
            _subjectRepo = subjectRepo;
        }
        [HttpGet]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<IEnumerable<CourseSubject>>> Get()
        {
            return Ok(await _subjectRepo.GetAll());
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseSubject>> Get(int id)
        {
            var subject = await _subjectRepo.GetCourseSubjectById(id);
            if (subject == null)
            {
                return NotFound();
            }
            return Ok(subject);
        }

        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<IEnumerable<CourseSubject>>> GetSubjectsByCourseId(int courseId)
        {
            var subjects = await _subjectRepo.GetSubjectsByCourseId(courseId);
            if (subjects == null || !subjects.Any())
            {
                return NotFound($"No subjects found for course ID {courseId}");
            }
            return Ok(subjects);
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpPost]
        public async Task<ActionResult<CourseSubject>> Post([FromBody] CourseSubject subject)
        {
            await _subjectRepo.Add(subject);
            return CreatedAtAction(nameof(Get), new { id = subject.Id }, subject);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpPut("{id}")]
        public async Task<ActionResult<CourseSubject>> Put(int id, [FromBody] CourseSubject subject)
        {
            if (id != subject.Id)
            {
                return BadRequest();
            }
            await _subjectRepo.Update(subject);
            return NoContent();
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _subjectRepo.DeleteById(id);
            return NoContent();
        }
    }
}