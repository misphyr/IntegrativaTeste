using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Models.Enums;

namespace Api.Requests.Historicos
{
    public class UpdateHistoricoRequest
    {
        public string? Descricao { get; set; }
    }
}