using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepo _studentRepo;
        public StudentsController(IStudentRepo studentRepo)
        {
            _studentRepo = studentRepo;
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentProfile>>> Get()
        {
            return Ok(await _studentRepo.GetAll());
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpGet("{studentId}")]
        public async Task<ActionResult<StudentProfile>> Get(int studentId)
        {
            var student = await _studentRepo.GetStudentbyId(studentId);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpGet("student{userId}")]
        public async Task<ActionResult<StudentProfile>> GetByUserId(int userId)
        {
            var student = await _studentRepo.GetStudentbyUserId(userId);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("upload")]
        public async Task<ActionResult<StudentProfile>> Post([FromForm] int userId, [FromForm] string firstName, [FromForm] string lastName,
            [FromForm] string gender, [FromForm] DateOnly dob, [FromForm] string contact, [FromForm] string studentAddress,
            [FromForm] int courseID, [FromForm] int academicYear, IFormFile profilePic)
        {
            byte[] imageBytes;
            using (MemoryStream ms = new MemoryStream())
            {
                await profilePic.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }
            var studentProfile = new StudentProfile()
            {
                UserId = userId,
                FirstName = firstName,
                LastName = lastName,
                Gender = gender,
                Dob = dob,
                Contact = contact,
                StudentAddress = studentAddress,
                CourseId = courseID,
                AcademicYear = academicYear,
                ProfilePic = imageBytes
            };
            await _studentRepo.Add(studentProfile);
            await _studentRepo.SaveAsync();
            return Ok(studentProfile);
        }
        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpPut("{id}")]
        public async Task<ActionResult<StudentProfile>> Put(
            int id,
            [FromForm] int? userId,
            [FromForm] string? firstName,
            [FromForm] string? lastName,
            [FromForm] string? gender,
            [FromForm] DateOnly? dob,
            [FromForm] string? contact,
            [FromForm] string? studentAddress,
            [FromForm] int? courseID,
            [FromForm] int? academicYear,
            IFormFile? profilePic
            )
        {
            //if (id != student.StudentProfileId)
            //{
            //    return BadRequest();
            //}
            //await _studentRepo.Update(student);
            //return NoContent();
            var existingStudent = await _studentRepo.GetStudentbyId(id);

            if (existingStudent == null)
            {
                return NotFound("Student not found");
            }

            // Create a new student object with the updated data (fields that are provided)
            var studentToUpdate = new StudentProfile
            {
                StudentProfileId = id,
                UserId = userId ?? existingStudent.UserId,
                FirstName = firstName ?? existingStudent.FirstName,
                LastName = lastName ?? existingStudent.LastName,
                Gender = gender ?? existingStudent.Gender,
                Dob = dob ?? existingStudent.Dob,
                Contact = contact ?? existingStudent.Contact,
                StudentAddress = studentAddress ?? existingStudent.StudentAddress,
                CourseId = courseID ?? existingStudent.CourseId,
                AcademicYear = academicYear ?? existingStudent.AcademicYear,
                ProfilePic = profilePic != null ? await ConvertToByteArray(profilePic) : existingStudent.ProfilePic
            };

            // Update the student record
            await _studentRepo.Update(studentToUpdate);
            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _studentRepo.DeleteById(id);
            return NoContent();
        }
        private async Task<byte[]> ConvertToByteArray(IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}