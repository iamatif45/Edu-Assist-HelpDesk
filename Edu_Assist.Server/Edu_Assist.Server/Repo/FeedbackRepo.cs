using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Edu_Assist.Server.Repo
{
    public class FeedbackRepo : IFeedbackRepo
    {
        private readonly EduAssistHelpdeskContext _context;

        public FeedbackRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var feedback = await _context.Feedbacks.SingleOrDefaultAsync(a => a.FeedbackId == id);
            if (feedback != null)
            {
                _context.Feedbacks.Remove(feedback);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Feedback>> GetAll()
        {
            return await _context.Feedbacks.ToListAsync();
        }

        public async Task<Feedback> GetFeedbackbyId(int Id)
        {
            return await _context.Feedbacks.SingleOrDefaultAsync(f => f.FeedbackId == Id);
        }

        public async Task<List<Feedback>> GetFeedbackbyStudentId(int id)
        {
            return await _context.Feedbacks.Where(cs => cs.StudentId == id).ToListAsync();
        }

        public async Task Update(Feedback feedback)
        {
            _context.Feedbacks.Update(feedback);
            await _context.SaveChangesAsync();
        }
    }
}
