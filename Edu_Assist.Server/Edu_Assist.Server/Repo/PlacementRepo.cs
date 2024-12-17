using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class PlacementRepo:IPlacementRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        public PlacementRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(PlacementDrife drive)
        {
            await _context.PlacementDrives.AddAsync(drive);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var placementDrive = await _context.PlacementDrives.SingleOrDefaultAsync(a => a.DriveId == id);
            if (placementDrive != null)
            {
                _context.PlacementDrives.Remove(placementDrive);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<PlacementDrife> GetPlacementDriveById(int id)
        {
            return await _context.PlacementDrives.SingleOrDefaultAsync(a => a.DriveId == id);
        }

        public async Task<List<PlacementDrife>> GetAll()
        {
            return await _context.PlacementDrives.ToListAsync();
        }

        public async Task Update(PlacementDrife drive)
        {
            _context.PlacementDrives.Update(drive);
            await _context.SaveChangesAsync();
        }
    }
}
