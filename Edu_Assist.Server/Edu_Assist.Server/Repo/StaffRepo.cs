using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class StaffRepo : IStaffRepo
    {
        private readonly EduAssistHelpdeskContext _context;

        public StaffRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(StaffProfile staff)
        {
            await _context.StaffProfiles.AddAsync(staff);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var staff
                           = await _context.StaffProfiles.SingleOrDefaultAsync(s => s.StaffProfileId == id);
            if (staff != null)
            {
                _context.StaffProfiles.Remove(staff);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<StaffProfile>> GetAll()
        {
            return await _context.StaffProfiles.ToListAsync();
        }

        public async Task<StaffProfile> GetStaffbyId(int id)
        {
            return await _context.StaffProfiles.SingleOrDefaultAsync(s => s.StaffProfileId == id);
        }

        public async Task Update(StaffProfile staff)
        {
            _context.StaffProfiles.Update(staff);
            await _context.SaveChangesAsync();
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<StaffProfile> GetStaffbyUserId(int id)
        {
            return await _context.StaffProfiles.SingleOrDefaultAsync(s => s.UserId == id);
        }
    }
}
