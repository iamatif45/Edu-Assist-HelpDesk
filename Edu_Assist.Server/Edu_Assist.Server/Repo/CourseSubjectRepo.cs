using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{   
    public class CourseSubjectRepo : ICourseSubjectRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        public CourseSubjectRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(CourseSubject courseSubject)
        {
            await _context.CourseSubjects.AddAsync(courseSubject);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var courseSubject = await _context.CourseSubjects.SingleOrDefaultAsync(a => a.Id == id);
            if (courseSubject != null)
            {
                _context.CourseSubjects.Remove(courseSubject);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<CourseSubject>> GetAll()
        {
            return await _context.CourseSubjects.ToListAsync();
        }

        public async Task<CourseSubject> GetCourseSubjectById(int id)
        {
            return await _context.CourseSubjects.SingleOrDefaultAsync(f => f.Id == id);
        }
        
        public async Task<List<CourseSubject>> GetSubjectsByCourseId(int courseId)
        {
            return await _context.CourseSubjects
                                 .Where(cs => cs.CourseId == courseId)
                                 .ToListAsync();
        }
        
        public async Task Update(CourseSubject courseSubject)
        {
            _context.CourseSubjects.Update(courseSubject);
            await _context.SaveChangesAsync();
        }

        
    }
}
