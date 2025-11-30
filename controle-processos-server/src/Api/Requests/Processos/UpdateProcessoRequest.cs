using System.ComponentModel.DataAnnotations;
using Api.Models.Enums;

namespace Api.Requests.Processos
{
    public class UpdateProcessoRequest
    {
        public string? NumeroProcesso { get; set; }
        public string? Autor { get; set; }
        public string? Reu { get; set; }
        public DateTime? DataAjuizamento { get; set; }
        public EProcessoStatus? Status { get; set; }
        public string? Descricao { get; set; }
    }
}
