using Edu_Assist.Server.Models;
using Edu_Assist.Server.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edu_Assist.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FeePaymentRecordsController : ControllerBase
    {
        private readonly IFeePaymentRepo _feeRepo;
        public FeePaymentRecordsController(IFeePaymentRepo feePaymentRepo)
        {
            _feeRepo = feePaymentRepo;
        }
        [HttpGet]

        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<IEnumerable<FeePaymentRecord>>> Get()
        {
            return Ok(await _feeRepo.GetAll());
        }
        [Authorize(Roles = "Admin,Staff,Student")]
        [HttpGet("fee/{id}")]
        public async Task<ActionResult<FeePaymentRecord>> GetFeeRecordByStudentId(int id)
        {
            var fee = await _feeRepo.GetFeeRecordbyStudentId(id);
            if (fee == null)
            {
                return NotFound();
            }
            return Ok(fee);
        }

        [Authorize(Roles ="Admin,Staff")]
        [HttpGet("{id}")]
        public async Task<ActionResult<FeePaymentRecord>> Get(int id)
        {
            var feePayment = await _feeRepo.GetFeePaymentById(id);
            if (feePayment == null)
            {
                return NotFound();
            }
            return Ok(feePayment);
        }


        [Authorize(Roles = "Admin,Staff")]
        [HttpPost]
        public async Task<ActionResult<FeePaymentRecord>> Post([FromBody] FeePaymentRecord feePayment)
        {
            await _feeRepo.Add(feePayment);
            return CreatedAtAction(nameof(Get), new { id = feePayment.PaymentId }, feePayment);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<FeePaymentRecord>> Put(int id, [FromBody] FeePaymentRecord feePayment)
        {
            if (id != feePayment.PaymentId)
            {
                return BadRequest();
            }
            await _feeRepo.Update(feePayment);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _feeRepo.DeleteById(id);
            return NoContent();
        }
    }
}