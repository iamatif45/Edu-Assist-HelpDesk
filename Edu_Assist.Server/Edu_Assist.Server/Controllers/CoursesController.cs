using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CoursesController : ControllerBase
    {
        public readonly ICourseRepo _courseRepo;
        public CoursesController(ICourseRepo courseRepo)
        {
            _courseRepo = courseRepo;
        }
        [HttpGet]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<IEnumerable<Course>>> Get()
        {
            return Ok(await _courseRepo.GetAll());
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Staff,Student")]
        public async Task<ActionResult<Course>> Get(int id)
        {
            var course = await _courseRepo.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpPost]
        public async Task<ActionResult<Course>> Post([FromBody] Course course)
        {
            await _courseRepo.Add(course);
            return CreatedAtAction(nameof(Get), new { id = course.CourseId }, course);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Course>> Put(int id, [FromBody] Course course)
        {
            if (id != course.CourseId)
            {
                return BadRequest();
            }
            await _courseRepo.Update(course);
            return NoContent();
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _courseRepo.DeleteById(id);
            return NoContent();
        }
    }
}