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
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedbackRepo _repo;
        public FeedbacksController(IFeedbackRepo feedbackRepo)
        {
            _repo = feedbackRepo;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Feedback>>> Get()
        {
            return Ok(await _repo.GetAll());
        }
        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> Get(int id)
        {
            var feedback = await _repo.GetFeedbackbyId(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpGet("Student/{id}")]
        public async Task<ActionResult<Feedback>> GetFeedbackByStudentId(int id)
        {
            var feedback = await _repo.GetFeedbackbyStudentId(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<ActionResult<Feedback>> Post([FromBody] Feedback feedback)
        {
            await _repo.Add(feedback);
            return CreatedAtAction(nameof(Get), new { id = feedback.FeedbackId }, feedback);
        }

        [Authorize(Roles = "Student")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Feedback>> Put(int id, [FromBody] Feedback feedback)
        {
            if (id != feedback.FeedbackId)
            {
                return BadRequest();
            }
            await _repo.Update(feedback);
            return NoContent();
        }
        [Authorize(Roles = "Student")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _repo.DeleteById(id);
            return NoContent();
        }
    }
}