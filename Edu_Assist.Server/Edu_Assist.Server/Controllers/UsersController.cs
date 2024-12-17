using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        public UsersController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return Ok(await _userRepo.GetAll());
        }
        [HttpGet("{username}")]
        [Authorize]
        public async Task<ActionResult<User>> Get(string username)
        {
            var user = await _userRepo.GetUserByUsername(username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            await _userRepo.Add(user);
            return CreatedAtAction(nameof(Get), new { username = user.Username }, user);
        }
        [HttpPut("{username}")]
        public async Task<ActionResult<User>> Put(string username, [FromBody] User user)
        {
            if (username != user.Username)
            {
                return BadRequest();
            }
            await _userRepo.Update(user);
            return NoContent();
        }
        [HttpPut("password/{username}/{oldPassword}")]
        public async Task<ActionResult<User>> UpdatePassword(string username,string oldPassword, [FromBody] User user)
        {
            if (username != user.Username)
            {
                return BadRequest();
            }
            await _userRepo.UpdatePassword(user,oldPassword);
            return NoContent();
        }
        [HttpDelete("{username}")]
        [Authorize]
        public async Task<ActionResult> Delete(string username)
        {
            await _userRepo.DeleteByUsername(username);
            return NoContent();
        }
        [HttpPost("authenticate")]
        public async Task<ActionResult<int>> Authenticate([FromBody] LoginModel login)
        {
            var user = await _userRepo.GetUserByUsername(login.Username);

            if (user == null)
            {
                return Ok(0); // User not found
            }

            // Verify password hash
            if (_userRepo.VerifyPasswordHash(user, login.Password))
            {
                return Ok(1); // Authentication successful
            }

            return Ok(0); // Invalid password
        }
    }
}