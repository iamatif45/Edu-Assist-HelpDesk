using Edu_Assist.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Repo
{
    public class UserRepo : IUserRepo
    {
        private readonly EduAssistHelpdeskContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        public UserRepo(EduAssistHelpdeskContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }
        public async Task Add(User user)
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, user.PasswordHash);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteByUsername(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u=>u.Username == username);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users
                .Include(u => u.Role)
                .ToListAsync();
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task Update(User user)
        {
            User existingUser = new User();
            existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser != null)
            {
                existingUser.Email = user.Email;
            }
            await _context.SaveChangesAsync();
        }
        public async Task UpdatePassword(User user,string oldPassword)
        {
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username);

            if (existingUser != null && VerifyPasswordHash(existingUser,oldPassword))
            {
                // Hash the new password before saving it
                existingUser.PasswordHash = _passwordHasher.HashPassword(user, user.PasswordHash);
                await _context.SaveChangesAsync();
            }
        }
        public bool VerifyPasswordHash(User user, string password)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            return result == PasswordVerificationResult.Success;
        }
    }
}
