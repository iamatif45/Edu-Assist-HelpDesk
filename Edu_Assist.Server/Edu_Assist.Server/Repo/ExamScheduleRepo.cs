using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class ExamScheduleRepo : IExamSchedule
    {
        private readonly EduAssistHelpdeskContext _context;

        public ExamScheduleRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(ExamSchedule examSchedule)
        {
            await _context.ExamSchedules.AddAsync(examSchedule);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var exam = await _context.ExamSchedules.SingleOrDefaultAsync(a => a.ExamId == id);
            if (exam != null)
            {
                _context.ExamSchedules.Remove(exam);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<ExamSchedule>> GeExamScheduleByCourseId(int id)
        {
            return await _context.ExamSchedules.Where(cs => cs.CourseId == id).Include(e => e.Subject).ToListAsync();

        }

        public async Task<ExamSchedule> GeExamScheduleById(int id)
        {
            return await _context.ExamSchedules.Include(e => e.Subject).SingleOrDefaultAsync(f => f.ExamId == id); ;
        }

        public async Task<List<ExamSchedule>> GetAll()
        {
            return await _context.ExamSchedules.Include(e => e.Subject).ToListAsync();

        }

        public async Task Update(ExamSchedule examSchedule)
        {
            _context.ExamSchedules.Update(examSchedule);
            await _context.SaveChangesAsync();
        }
    }
}
