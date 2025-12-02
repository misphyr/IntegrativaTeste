using System.ComponentModel.DataAnnotations;
using Api.Models.Enums;

namespace Api.Models
{
    public class Processo
    {
        public long Id { get; set; }
        
        [Required(ErrorMessage = "O Número de Processo é obrigatório")]
        [StringLength(20, MinimumLength = 1, 
            ErrorMessage = "Número de Processo deve ter entre 1 e 20 caracteres")]
        public string NumeroProcesso { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "O Autor é obrigatório")]
        [StringLength(255, MinimumLength = 1, 
            ErrorMessage = "Autor deve ter entre 1 e 255 caracteres")]
        public string Autor { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "O Réu é obrigatório")]
        [StringLength(255, MinimumLength = 1, 
            ErrorMessage = "Réu deve ter entre 1 e 255 caracteres")]
        public string Reu { get; set; } = string.Empty;
        
        public DateTime? DataAjuizamento { get; set; }
        
        public EProcessoStatus Status { get; set; } = EProcessoStatus.EmAndamento;
        
        [StringLength(500, ErrorMessage = "Descrição não pode ter mais de 500 caracteres")]
        public string? Descricao { get; set; }
        
        public DateTime DataInclusao { get; set; } = DateTime.UtcNow;
        
        public List<Historico> Historicos { get; set; } = [];
    }
}
