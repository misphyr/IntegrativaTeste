using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Models.Enums;

namespace Api.Requests.Historicos
{
    public class UpdateHistoricoRequest
    {
        [StringLength(500, ErrorMessage = "Descrição não pode ter mais de 500 caracteres")]
        public string? Descricao { get; set; }
    }
}