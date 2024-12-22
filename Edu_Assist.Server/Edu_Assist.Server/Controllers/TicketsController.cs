using Edu_Assist.Server.DTO;
using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketRepo _ticketRepo;

        public TicketsController(ITicketRepo ticketRepo)
        {
            _ticketRepo = ticketRepo;
        }

        // Get all tickets with department name instead of ID
        [Authorize(Roles = "Admin,Staff")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketDTO>>> Get()
        {
            var tickets = await _ticketRepo.GetAll();

            var ticketDTOs = tickets.Select(ticket => new TicketDTO
            {
                TicketId = ticket.TicketId,
                StudentId = ticket.StudentId,
                DepartmentName = ticket.Department?.DepartmentName ?? "Unknown", // Get department name
                Title = ticket.Title,
                Description = ticket.Description,
                CurrentStatus = ticket.CurrentStatus,
                AssignedToStaffId = ticket.AssignedToStaffId,
                ResolvedDate = ticket.ResolvedDate,
                Created = ticket.Created,
                Updated = ticket.Updated
            }).ToList();

            return Ok(ticketDTOs);
        }

        // Get a single ticket by ID with department name instead of ID
        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDTO>> Get(int id)
        {
            var ticket = await _ticketRepo.GetTicketById(id);

            if (ticket == null)
            {
                return NotFound();
            }

            var ticketDTO = new TicketDTO
            {
                TicketId = ticket.TicketId,
                StudentId = ticket.StudentId,
                DepartmentName = ticket.Department?.DepartmentName ?? "Unknown", // Get department name
                Title = ticket.Title,
                Description = ticket.Description,
                CurrentStatus = ticket.CurrentStatus,
                AssignedToStaffId = ticket.AssignedToStaffId,
                ResolvedDate = ticket.ResolvedDate,
                Created = ticket.Created,
                Updated = ticket.Updated
            };

            return Ok(ticketDTO);
        }

        // Get tickets by StudentId with department name instead of ID
        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpGet("Tickets/{id}")]
        public async Task<ActionResult<IEnumerable<TicketDTO>>> GetbyStudentId(int id)
        {
            var tickets = await _ticketRepo.GetTicketByStudentId(id);

            if (tickets == null || !tickets.Any())
            {
                return NotFound();
            }

            var ticketDTOs = tickets.Select(ticket => new TicketDTO
            {
                TicketId = ticket.TicketId,
                StudentId = ticket.StudentId,
                DepartmentName = ticket.Department?.DepartmentName ?? "Unknown", // Get department name
                Title = ticket.Title,
                Description = ticket.Description,
                CurrentStatus = ticket.CurrentStatus,
                AssignedToStaffId = ticket.AssignedToStaffId,
                ResolvedDate = ticket.ResolvedDate,
                Created = ticket.Created,
                Updated = ticket.Updated
            }).ToList();

            return Ok(ticketDTOs);
        }

        // Create a new ticket
        [Authorize(Roles = "Student,Admin,Staff")]
        [HttpPost]
        public async Task<ActionResult<TicketDTO>> Post([FromBody] Ticket ticket)
        {
            await _ticketRepo.Add(ticket);

            // Return a created response with the TicketDTO
            var ticketDTO = new TicketDTO
            {
                TicketId = ticket.TicketId,
                StudentId = ticket.StudentId,
                DepartmentName = ticket.Department?.DepartmentName ?? "Unknown",
                Title = ticket.Title,
                Description = ticket.Description,
                CurrentStatus = ticket.CurrentStatus,
                AssignedToStaffId = ticket.AssignedToStaffId,
                ResolvedDate = ticket.ResolvedDate,
                Created = ticket.Created,
                Updated = ticket.Updated
            };

            return CreatedAtAction(nameof(Get), new { id = ticket.TicketId }, ticketDTO);
        }

        // Update a ticket
        [Authorize(Roles = "Student,Staff,Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest();
            }

            await _ticketRepo.Update(ticket);

            return NoContent();
        }

        // Delete a ticket
        [Authorize(Roles = "Admin,Student,Staff")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _ticketRepo.DeleteById(id);
            return NoContent();
        }
    }
}
