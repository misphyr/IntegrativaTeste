using System.ComponentModel.DataAnnotations;
using Api.Models.Enums;

namespace Api.Models
{
    public class Processo
    {
        public long Id { get; set; }
        public string NumeroProcesso { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string Reu { get; set; } = string.Empty;
        public DateTime? DataAjuizamento { get; set; }
        public EProcessoStatus Status { get; set; } = EProcessoStatus.EmAndamento;
        public string? Descricao { get; set; }
        public DateTime DataInclusao { get; set; } = DateTime.UtcNow;
        public List<Historico> Historicos { get; set; } = [];
    }
}
