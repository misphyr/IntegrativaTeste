using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class Historico
    {
        public long Id { get; set; }
        
        [Required(ErrorMessage = "O ID do Processo é obrigatório")]
        public long ProcessoId { get; set; }
        
        [JsonIgnore]
        public Processo? Processo { get; set; }
        
        [StringLength(500, ErrorMessage = "Descrição não pode ter mais de 500 caracteres")]
        public string? Descricao { get; set; }
        
        public DateTime DataInclusao { get; set; } = DateTime.UtcNow;
        
        public DateTime DataAlteracao { get; set; } = DateTime.UtcNow;
    }
}
