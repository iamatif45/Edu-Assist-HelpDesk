using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Edu_Assist.Server.Repo
{
    public class LogisticsRepo : ILogisticsRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        public LogisticsRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(Logistic logistic)
        {
            await _context.Logistics.AddAsync(logistic);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var logistic = await _context.Logistics.SingleOrDefaultAsync(l => l.LogisticsId == id);
            if (logistic != null)
            {
                _context.Logistics.Remove(logistic);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Logistic>> GetAll()
        {
            return await _context.Logistics.ToListAsync();
        }

        public async Task<Logistic> GetLogisticById(int id)
        {
            return await _context.Logistics.SingleOrDefaultAsync(l => l.LogisticsId == id);
        }

        public async Task Update(Logistic logistic)
        {
            _context.Logistics.Update(logistic);
            await _context.SaveChangesAsync();
        }
    }
}
