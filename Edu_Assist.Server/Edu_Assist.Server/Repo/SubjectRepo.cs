using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Edu_Assist.Server.Repo
{
    public class SubjectRepo : ISubjectRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        public SubjectRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(Subject subject)
        {
            await _context.Subjects.AddAsync(subject);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var subject = await _context.Subjects.SingleOrDefaultAsync(s => s.SubjectId == id);
            if (subject != null)
            {
                _context.Subjects.Remove(subject);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Subject> GetSubjectById(int id)
        {
            return await _context.Subjects.SingleOrDefaultAsync(s => s.SubjectId == id);
        }

        public async Task<List<Subject>> GetAll()
        {
            return await _context.Subjects.ToListAsync();
        }

        public async Task Update(Subject subject)
        {
            _context.Subjects.Update(subject);
            await _context.SaveChangesAsync();
        }
    }
}
