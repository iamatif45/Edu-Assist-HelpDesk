using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivityRepo _activityRepo;
        public ActivitiesController(IActivityRepo activityRepo)
        {
            _activityRepo = activityRepo;
        }
        [HttpGet]
        [Authorize(Roles = "Admin,Staff,Student")]

        public async Task<ActionResult<IEnumerable<Activity>>> Get()
        {
            return Ok(await _activityRepo.GetAll());
        }
        [Authorize]
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<Activity>> Get(int id)
        {
            var activity = await _activityRepo.GetActivityById(id);
            if (activity == null)
            {
                return NotFound();
            }
            return Ok(activity);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpPost]
        public async Task<ActionResult<Activity>> Post([FromBody] Activity activity)
        {
            await _activityRepo.Add(activity);
            return CreatedAtAction(nameof(Get), new { id = activity.ActivityId }, activity);
        }

        //[Authorize(Roles = "Admin,Staff")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Activity>> Put(int id, [FromBody] Activity activity)
        {
            if (id != activity.ActivityId)
            {
                return BadRequest();
            }
            await _activityRepo.Update(activity);
            return NoContent();
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _activityRepo.DeleteById(id);
            return NoContent();
        }
    }
}
