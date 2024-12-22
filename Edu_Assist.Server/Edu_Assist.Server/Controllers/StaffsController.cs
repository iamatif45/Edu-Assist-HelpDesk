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
    public class StaffsController : ControllerBase
    {

        private readonly IStaffRepo _staffRepo;
        public StaffsController(IStaffRepo staffRepo)
        {
            _staffRepo = staffRepo;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffProfile>>> Get()
        {
            return Ok(await _staffRepo.GetAll());
        }
        [Authorize(Roles = "Admin,Staff")]
        [HttpGet("{id}")]
        public async Task<ActionResult<StaffProfile>> Get(int id)
        {
            var staff = await _staffRepo.GetStaffbyId(id);
            if (staff == null)
            {
                return NotFound();
            }
            return Ok(staff);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpGet("staff/{id}")]
        public async Task<ActionResult<StaffProfile>> GetbyUserId(int id)
        {
            var staff = await _staffRepo.GetStaffbyUserId(id);
            if (staff == null)
            {
                return NotFound();
            }
            return Ok(staff);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("uplaod")]
        public async Task<ActionResult<StaffProfile>> Post([FromForm] int userId, [FromForm] string firstName, [FromForm] string lastName,
            [FromForm] string gender, [FromForm] int departmentId, [FromForm] string contact,
            IFormFile profilePic)
        {
            byte[] imageBytes;
            using (MemoryStream ms = new MemoryStream())
            {
                await profilePic.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }
            var staff = new StaffProfile()
            {
                UserId = userId,
                FirstName = firstName,
                LastName = lastName,
                Gender = gender,
                DepartmentId = departmentId,
                Contact = contact,
                ProfilePic = imageBytes
            };
            await _staffRepo.Add(staff);
            await _staffRepo.SaveAsync();
            return Ok(staff);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<StaffProfile>> Put(int id, [FromBody] StaffProfile staff)
        {
            if (id != staff.StaffProfileId)
            {
                return BadRequest();
            }
            await _staffRepo.Update(staff);
            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _staffRepo.DeleteById(id);
            return NoContent();
        }
    }
}