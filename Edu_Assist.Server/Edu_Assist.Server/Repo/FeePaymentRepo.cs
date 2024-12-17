using Edu_Assist.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class FeePaymentRepo : IFeePaymentRepo
    {
        private readonly EduAssistHelpdeskContext _context;

        public FeePaymentRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
        }
        public async Task Add(FeePaymentRecord feePaymentRecord)
        {
            await _context.FeePaymentRecords.AddAsync(feePaymentRecord);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var feePayment = await _context.FeePaymentRecords.SingleOrDefaultAsync(a => a.PaymentId == id);
            if (feePayment != null)
            {
                _context.FeePaymentRecords.Remove(feePayment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<FeePaymentRecord>> GetAll()
        {
          return await _context.FeePaymentRecords.ToListAsync();    
        }

        public async Task<FeePaymentRecord> GetFeePaymentById(int id)
        {
            return await _context.FeePaymentRecords.SingleOrDefaultAsync(s => s.PaymentId == id);
        }

        public async Task<List<FeePaymentRecord>> GetFeeRecordbyStudentId(int id)
        {
            return await _context.FeePaymentRecords.Where(cs => cs.StudentId == id).ToListAsync();
        }

        public async Task Update(FeePaymentRecord feePaymentRecord)
        {
            _context.FeePaymentRecords.Update(feePaymentRecord);
            await _context.SaveChangesAsync();
        }
    }
}
