using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassSchedulesController : ControllerBase
    {
        public readonly IClassSchedule _classScheduleRepo;
        public ClassSchedulesController(IClassSchedule _repo)
        {
            _classScheduleRepo = _repo;
        }
        [HttpGet]
        [Authorize(Roles = "Admin,Staff,Student")]
        public async Task<ActionResult<IEnumerable<ClassSchedule>>> Get()
        {
            return Ok(await _classScheduleRepo.GetAll());
        }
        [HttpGet("course/{id}")]
        [Authorize(Roles = "Admin,Staff,Student")]
        public async Task<ActionResult<Course>> Get(int id)
        {
            var classSchedule = await _classScheduleRepo.GetClassScheduleByCourseID(id);
            if (classSchedule == null)
            {
                return NotFound();
            }
            return Ok(classSchedule);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<Course>> GetbyScheduledId(int id)
        {
            var classSchedule = await _classScheduleRepo.GetclassSChedulebyId(id);
            if (classSchedule == null)
            {
                return NotFound();
            }
            return Ok(classSchedule);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpPost]

        public async Task<ActionResult<ClassSchedule>> Post([FromBody] ClassSchedule classSchedule)
        {
            await _classScheduleRepo.Add(classSchedule);
            return CreatedAtAction(nameof(Get), new { id = classSchedule.ScheduleId }, classSchedule);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ClassSchedule>> Put(int id, [FromBody] ClassSchedule classSchedule)
        {
            if (id != classSchedule.ScheduleId)
            {
                return BadRequest();
            }
            await _classScheduleRepo.Update(classSchedule);
            return NoContent();
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _classScheduleRepo.DeleteByClassScheduleId(id);
            return NoContent();
        }
    }
}