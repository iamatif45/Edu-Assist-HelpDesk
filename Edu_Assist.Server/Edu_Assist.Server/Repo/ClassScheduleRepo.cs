using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class ClassScheduleRepo : IClassSchedule
    {
        private readonly EduAssistHelpdeskContext _context;
        public ClassScheduleRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(ClassSchedule classSchedule)
        {
            await _context.ClassSchedules.AddAsync(classSchedule);
            await _context.SaveChangesAsync();

        }

        public async Task DeleteByClassScheduleId(int id)
        {
            var classSchedule = await _context.ClassSchedules.SingleOrDefaultAsync(c => c.ScheduleId == id);
            if (classSchedule != null)
            {
                _context.ClassSchedules.Remove(classSchedule);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<ClassSchedule>> GetClassScheduleByCourseID(int id)
        {
            return await _context.ClassSchedules.Where(cs => cs.CourseId == id).ToListAsync();

        }

        public async Task<List<ClassSchedule>> GetAll()
        {
            return await _context.ClassSchedules.ToListAsync();

        }

        public async Task Update(ClassSchedule classSchedule)
        {
            _context.ClassSchedules.Update(classSchedule);
            await _context.SaveChangesAsync();
        }

        public async Task<ClassSchedule> GetclassSChedulebyId(int id)
        {
            return await _context.ClassSchedules.SingleOrDefaultAsync(p => p.ScheduleId == id);
        }

    }
}
