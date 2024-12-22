using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        public AuthenticationController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LoginModel login)
        {
            var user = await _userRepo.GetUserByUsername(login.Username);
            if (user == null)
            {
                return BadRequest("Invalid Request: Please Provide username and password first");
            }
            else
            {
                if (_userRepo.VerifyPasswordHash(user,login.Password))
                {
                    var claims = new [] { 
                        new Claim(ClaimTypes.Name,login.Username),
                        new Claim(ClaimTypes.Role,login.Role),
                    };
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a"));
                    var signinCredential = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokenOptions = new JwtSecurityToken(
                        issuer: "https://localhost:5001",
                        audience: "https://localhost:5001",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(60),
                        signingCredentials: signinCredential
                        );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    return Ok(new AuthenticationResponse
                    {
                        Token = tokenString,
                        UserId = user.UserId,
                        Username = user.Username,
                        Email = user.Email,
                        RoleId = user.RoleId,
                        RoleName = user.Role.RoleName,
                        IsActive = user.IsActive,
                    });
                }
                return Unauthorized();
            }
        }
    }
}
