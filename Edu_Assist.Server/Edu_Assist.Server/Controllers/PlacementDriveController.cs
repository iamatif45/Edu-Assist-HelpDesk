using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PlacementDriveController : ControllerBase
    {
        private readonly IPlacementRepo _placementRepo;
        public PlacementDriveController(IPlacementRepo placementRepo)
        {
            _placementRepo = placementRepo;
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlacementDrife>>> Get()
        {
            return Ok(await _placementRepo.GetAll());
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<PlacementDrife>> Get(int id)
        {
            var drive = await _placementRepo.GetPlacementDriveById(id);
            if (drive == null)
            {
                return NotFound();
            }
            return Ok(drive);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Activity>> Post([FromBody] PlacementDrife drive)
        {
            await _placementRepo.Add(drive);
            return CreatedAtAction(nameof(Get), new { id = drive.DriveId }, drive);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Activity>> Put(int id, [FromBody] PlacementDrife drive)
        {
            if (id != drive.DriveId)
            {
                return BadRequest();
            }
            await _placementRepo.Update(drive);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _placementRepo.DeleteById(id);
            return NoContent();
        }
    }
}