using Api.Models;
using Api.Persistence;
using Api.Requests.Historicos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("historicos")]
    public class HistoricosController(ApplicationDbContext dbContext): ControllerBase
    {
        [HttpPost("")]
        public async Task<IActionResult> CreateHistorico([FromBody]CreateHistoricoRequest request)
        {
            var processoExists = await dbContext.Set<Processo>().AnyAsync(p => p.Id == request.ProcessoId);
            if (!processoExists)
            {
                return BadRequest("O processo informado não existe");
            }

            Historico historico = new Historico();

            historico.ProcessoId = request.ProcessoId;
            historico.Descricao = request.Descricao;

            await dbContext.Set<Historico>().AddAsync(historico);
            await dbContext.SaveChangesAsync();
            return Created("", historico);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetHistoricos()
        {
            var historicos = await dbContext.Set<Historico>().AsNoTracking().OrderByDescending(h => h.Id).ToListAsync();


            return Ok(historicos);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHistorico([FromRoute]long id, [FromBody] UpdateHistoricoRequest request)
        {
            var historico = await dbContext.Set<Historico>().FindAsync(id);

            if(historico is null)
            {
                return NotFound("O Histórico informado não existe");
            }

            if (string.IsNullOrWhiteSpace(request.Descricao) is false)
            {
                historico.Descricao = request.Descricao;
            }

            historico.DataAlteracao = DateTime.UtcNow;

            await dbContext.SaveChangesAsync();
            
            return Ok(historico);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistorico([FromRoute] long id)
        {
            var historico = await dbContext.Set<Historico>().FindAsync(id);

            if (historico is null)
                return NotFound("Historico não existe.");

            dbContext.Set<Historico>().Remove(historico);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
