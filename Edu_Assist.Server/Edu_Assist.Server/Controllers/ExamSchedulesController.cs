
using Edu_Assist.Server.Models;
using Edu_Assist.Server.DTO;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExamSchedulesController : ControllerBase
    {
        private readonly IExamSchedule _examRepo;
        public ExamSchedulesController(IExamSchedule examRepo)
        {
            _examRepo = examRepo;
        }

        // Helper function to map ExamSchedule to ExamScheduleDTO
        private ExamScheduleDTO MapToDTO(ExamSchedule examSchedule)
        {
            return new ExamScheduleDTO
            {
                ExamId = examSchedule.ExamId,
                CourseId = examSchedule.CourseId,
                SubjectName = examSchedule.Subject?.SubjectName ?? string.Empty, // Assuming Subject has a Name property
                ExamDate = examSchedule.ExamDate,
                StartTime = examSchedule.StartTime,
                EndTime = examSchedule.EndTime,
                Room = examSchedule.Room
            };
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamScheduleDTO>>> Get()
        {
            var exams = await _examRepo.GetAll();
            var examDTOs = exams.Select(MapToDTO).ToList();
            return Ok(examDTOs);
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamScheduleDTO>> Get(int id)
        {
            var exam = await _examRepo.GeExamScheduleById(id);
            if (exam == null)
            {
                return NotFound();
            }
            return Ok(MapToDTO(exam));
        }

        [Authorize(Roles = "Admin,Student,Staff")]
        [HttpGet("exam/{id}")]
        public async Task<ActionResult<IEnumerable<ExamScheduleDTO>>> GetbyCourseId(int id)
        {
            var exams = await _examRepo.GeExamScheduleByCourseId(id);
            if (exams == null || !exams.Any())
            {
                return NotFound();
            }
            var examDTOs = exams.Select(MapToDTO).ToList();
            return Ok(examDTOs);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ExamScheduleDTO>> Post([FromBody] ExamSchedule exam)
        {
            await _examRepo.Add(exam);
            var examDTO = MapToDTO(exam);
            return CreatedAtAction(nameof(Get), new { id = exam.ExamId }, examDTO);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ExamSchedule exam)
        {
            if (id != exam.ExamId)
            {
                return BadRequest();
            }
            await _examRepo.Update(exam);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _examRepo.DeleteById(id);
            return NoContent();
        }
    }
}
