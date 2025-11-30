using System.ComponentModel.DataAnnotations;
using Api.Models.Enums;

namespace Api.Requests.Processos
{
    public class CreateProcessoRequest
    {
        [Required(ErrorMessage = "O Numero de Processo deve ser informado")]
        public string NumeroProcesso { get; set; } = string.Empty;

        [Required(ErrorMessage = "O Autor deve ser informado")]
        public string Autor { get; set; } = string.Empty;

        [Required(ErrorMessage = "O Réu deve ser informado")]
        public string Reu { get; set; } = string.Empty;
        public DateTime? DataAjuizamento { get; set; }
        public EProcessoStatus Status { get; set; } = EProcessoStatus.EmAndamento;
        public string? Descricao { get; set; }
    }
}
