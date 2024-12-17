using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Edu_Assist.Server.Repo
{
    public class CourseRepo : ICourseRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        public CourseRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(Course course)
        {
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var course = await _context.Courses.SingleOrDefaultAsync(c => c.CourseId == id);
            if (course != null)
            {
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Course>> GetAll()
        {
            return await _context.Courses
                .Include(c => c.HodNavigation)
                .ToListAsync();
        }

        public async Task<Course> GetCourseById(int id)
        {
            return await _context.Courses
                .Include(u => u.HodNavigation)
                .SingleOrDefaultAsync(c => c.CourseId == id);
        }

        public async Task Update(Course course)
        {
            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
        }
    }
}
