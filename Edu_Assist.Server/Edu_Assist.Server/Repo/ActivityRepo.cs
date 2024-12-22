using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class ActivityRepo : IActivityRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        public ActivityRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(Activity activity)
        {
            await _context.Activities.AddAsync(activity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var activity = await _context.Activities.SingleOrDefaultAsync(a => a.ActivityId == id);
            if (activity != null)
            {
                _context.Activities.Remove(activity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Activity> GetActivityById(int id)
        {
            return await _context.Activities.SingleOrDefaultAsync(a => a.ActivityId == id);
        }

        public async Task<List<Activity>> GetAll()
        {
            return await _context.Activities.ToListAsync();
        }

        public async Task Update(Activity activity)
        {
            _context.Activities.Update(activity);  
            await _context.SaveChangesAsync();
        }
    }
}
