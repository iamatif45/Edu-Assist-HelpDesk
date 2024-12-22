using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;

namespace Edu_Assist.Server.Repo
{
    public class TicketLogRepo : ITicketLogRepo
    {
        private readonly  EduAssistHelpdeskContext _context;

        public TicketLogRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(TicketLog ticketlog)
        {
            await _context.TicketLogs.AddAsync(ticketlog);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var ticketLog = await _context.TicketLogs.SingleOrDefaultAsync(s => s.LogId == id);
            if (ticketLog != null)
            {
                _context.TicketLogs.Remove(ticketLog);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<TicketLog>> GetAll()
        {
              return await _context.TicketLogs.ToListAsync();
        }

        public async Task<TicketLog> GetTicketById(int id)
        {
            return await _context.TicketLogs.SingleOrDefaultAsync(s => s.LogId == id);

        }

        public async Task<List<TicketLog>> GetTicketLogByTicketId(int id)
        {
            return await _context.TicketLogs.Where(ts => ts.TicketId == id).ToListAsync();
        }

        public async Task Update(TicketLog ticketlog)
        {
            _context.TicketLogs.Update(ticketlog);
            await _context.SaveChangesAsync();

        }
    }
}
