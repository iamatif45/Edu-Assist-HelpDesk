using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class TicketRepo : ITicketRepo
    {
        private readonly EduAssistHelpdeskContext _context;

        public TicketRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(Ticket ticket)
        {
            await _context.Tickets.AddAsync(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var ticket = await _context.Tickets.SingleOrDefaultAsync(s => s.TicketId == id);
            if (ticket != null)
            {
                _context.Tickets.Remove(ticket);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Ticket>> GetAll()
        {
            return await _context.Tickets.Include(e => e.Department).ToListAsync();
        }

        public async Task<Ticket> GetTicketById(int id)
        {
            return await _context.Tickets.Include(e => e.Department).SingleOrDefaultAsync(s => s.TicketId == id);
        }

        public async Task<List<Ticket>> GetTicketByStudentId(int id)
        {
            return await _context.Tickets.Include(e => e.Department).Where(ts => ts.StudentId == id).ToListAsync();
        }

        public async Task Update(Ticket ticket)
        {
            var existingTicket = _context.Tickets.SingleOrDefault(t => t.TicketId == ticket.TicketId);
            if (existingTicket != null)
            {
                existingTicket.DepartmentId = ticket.DepartmentId;
                existingTicket.Title = ticket.Title;
                existingTicket.Description = ticket.Description;
                existingTicket.AssignedToStaff = ticket.AssignedToStaff;
                existingTicket.CurrentStatus = ticket.CurrentStatus;
            }
            await _context.SaveChangesAsync();
        }
    }
}
