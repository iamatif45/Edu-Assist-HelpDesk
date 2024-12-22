using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class StudentRepo : IStudentRepo
    {
        private readonly EduAssistHelpdeskContext _context;

        public StudentRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(StudentProfile student)
        {
            await _context.StudentProfiles.AddAsync(student);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int studentId)
        {
            var student
                = await _context.StudentProfiles.SingleOrDefaultAsync(s => s.StudentProfileId == studentId);
            if (student != null)
            {
                _context.StudentProfiles.Remove(student);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<StudentProfile>> GetAll()
        {
            return await _context.StudentProfiles.ToListAsync();
        }

        public async Task<StudentProfile> GetStudentbyId(int studentId)
        {
            return await _context.StudentProfiles.SingleOrDefaultAsync(s => s.StudentProfileId == studentId);
        }

        public async Task Update(StudentProfile student)
        {
            //_context.StudentProfiles.Update(student);
            //await _context.SaveChangesAsync();

            var existingStudent = await _context.StudentProfiles
                .SingleOrDefaultAsync(s => s.StudentProfileId == student.StudentProfileId);

            if (existingStudent != null)
            {
                // Update fields only if they are not null or unchanged.
                existingStudent.FirstName = student.FirstName ?? existingStudent.FirstName;
                existingStudent.LastName = student.LastName ?? existingStudent.LastName;
                existingStudent.Gender = student.Gender ?? existingStudent.Gender;
                existingStudent.Dob = student.Dob != default ? student.Dob : existingStudent.Dob;
                existingStudent.Contact = student.Contact ?? existingStudent.Contact;
                existingStudent.StudentAddress = student.StudentAddress ?? existingStudent.StudentAddress;
                existingStudent.CourseId = student.CourseId != 0 ? student.CourseId : existingStudent.CourseId;
                existingStudent.AcademicYear = student.AcademicYear != 0 ? student.AcademicYear : existingStudent.AcademicYear;

                // If profilePic is not null, update the profile picture
                if (student.ProfilePic != null && student.ProfilePic.Length > 0)
                {
                    existingStudent.ProfilePic = student.ProfilePic;
                }

                await _context.SaveChangesAsync();
            }
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<StudentProfile> GetStudentbyUserId(int userId)
        {
            return await _context.StudentProfiles.SingleOrDefaultAsync(s => s.UserId == userId);
        }
    }
}
