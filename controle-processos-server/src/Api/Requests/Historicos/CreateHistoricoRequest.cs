using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Models.Enums;

namespace Api.Requests.Historicos
{
    public class CreateHistoricoRequest
    {
        static DateTime dataAgora = DateTime.UtcNow;

        public long ProcessoId { get; set; }
        public string? Descricao { get; set; }
        public DateTime DataInclusao { get; set; } = dataAgora;
        public DateTime DataAlteracao { get; set; } = dataAgora;
    }
}
