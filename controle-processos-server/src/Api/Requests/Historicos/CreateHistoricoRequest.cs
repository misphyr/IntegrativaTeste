using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Models.Enums;

namespace Api.Requests.Historicos
{
    public class CreateHistoricoRequest
    {
        static DateTime dataAgora = DateTime.UtcNow;

        [Required(ErrorMessage = "O ID do Processo é obrigatório")]
        public long ProcessoId { get; set; }
        
        [StringLength(500, ErrorMessage = "Descrição não pode ter mais de 500 caracteres")]
        public string? Descricao { get; set; }
        
        public DateTime DataInclusao { get; set; } = dataAgora;
        public DateTime DataAlteracao { get; set; } = dataAgora;
    }
}
