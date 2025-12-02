using System.Diagnostics;
using Api.Models;
using Api.Persistence;
using Api.Requests.Processos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop;

namespace Api.Controllers
{
    [ApiController]
    [Route("processos")]
    public class ProcessosController(ApplicationDbContext dbContext) : ControllerBase
    {
        [HttpPost("")]
        public async Task<IActionResult> CreateProcesso([FromBody] CreateProcessoRequest request)
        {
            Processo processo = new Processo();

            processo.NumeroProcesso = request.NumeroProcesso;
            processo.Autor = request.Autor;
            processo.Reu = request.Reu;
            processo.Status = request.Status;
            processo.Descricao = request.Descricao;
            processo.DataAjuizamento = request.DataAjuizamento;

            await dbContext.Set<Processo>().AddAsync(processo);
            await dbContext.SaveChangesAsync();
            return Created("", processo);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetProcessos()
        {
            var processos = await dbContext.Set<Processo>().Include(p => p.Historicos).AsNoTracking().OrderByDescending(p => p.Id).ToListAsync();


            return Ok(processos);
        }

        [HttpGet("numeroprocesso")]
        public async Task<IActionResult> GetProcesso([FromQuery] string numero)
        {
            var processos = await dbContext.Set<Processo>()
            .Include(p => p.Historicos)
            .Where(p => p.NumeroProcesso.Contains(numero))
            .OrderByDescending(p => p.Id)
            .ToListAsync();

            return Ok(processos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProcessoById([FromRoute] long id)
        {
            var processo = await dbContext.Set<Processo>()
                .Include(p => p.Historicos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (processo is null)
            {
                return NotFound("O Processo informado não existe");
            }

            return Ok(processo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProcesso([FromRoute] long id, [FromBody] UpdateProcessoRequest request)
        {
            var processo = await dbContext.Set<Processo>().FindAsync(id);

            if (processo is null)
            {
                return NotFound("O Processo informado não existe");
            }

            if (string.IsNullOrWhiteSpace(request.NumeroProcesso) is false)
            {

                processo.NumeroProcesso = request.NumeroProcesso;
            }

            if (string.IsNullOrWhiteSpace(request.Autor) is false)
            {
                processo.Autor = request.Autor;
            }

            if (string.IsNullOrWhiteSpace(request.Reu) is false)
            {
                processo.Reu = request.Reu;
            }

            if (request.DataAjuizamento.HasValue)
            {
                processo.DataAjuizamento = request.DataAjuizamento;
            }

            if (request.Status.HasValue)
            {
                processo.Status = request.Status.Value;
            }

            if (string.IsNullOrWhiteSpace(request.Descricao) is false)
            {
                processo.Descricao = request.Descricao;
            }

            await dbContext.SaveChangesAsync();

            return Ok(processo);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcesso([FromRoute] long id)
        {
            var processo = await dbContext.Set<Processo>().FindAsync(id);

            if (processo is null)
                return NotFound("Processo não existe.");

            dbContext.Set<Processo>().Remove(processo);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

    }
}
