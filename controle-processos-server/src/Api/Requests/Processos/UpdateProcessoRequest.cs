using System.ComponentModel.DataAnnotations;
using Api.Models.Enums;

namespace Api.Requests.Processos
{
    public class UpdateProcessoRequest
    {
        [StringLength(20, MinimumLength = 1, 
            ErrorMessage = "Número de Processo deve ter entre 1 e 20 caracteres")]
        public string? NumeroProcesso { get; set; }
        
        [StringLength(255, MinimumLength = 1, 
            ErrorMessage = "Autor deve ter entre 1 e 255 caracteres")]
        public string? Autor { get; set; }
        
        [StringLength(255, MinimumLength = 1, 
            ErrorMessage = "Réu deve ter entre 1 e 255 caracteres")]
        public string? Reu { get; set; }
        
        public DateTime? DataAjuizamento { get; set; }
        
        public EProcessoStatus? Status { get; set; }
        
        [StringLength(500, ErrorMessage = "Descrição não pode ter mais de 500 caracteres")]
        public string? Descricao { get; set; }
    }
}
