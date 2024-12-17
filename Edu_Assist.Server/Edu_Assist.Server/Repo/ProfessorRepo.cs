using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Edu_Assist.Server.Repo
{
    public class ProfessorRepo : IProfessorRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        public ProfessorRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(Professor professor)
        {
            await _context.Professors.AddAsync(professor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var professor = await _context.Professors.SingleOrDefaultAsync(p => p.ProfessorId == id);
            if (professor != null)
            {
                _context.Professors.Remove(professor);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Professor>> GetAll()
        {
            return await _context.Professors.ToListAsync();
        }

        public async Task<Professor> GetProfessorById(int id)
        {
            return await _context.Professors.SingleOrDefaultAsync(p => p.ProfessorId == id);
        }

        public async Task Update(Professor professor)
        {
            _context.Professors.Update(professor);
            await _context.SaveChangesAsync();
        }
    }
}
