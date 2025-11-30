using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class Historico
    {
        public long Id { get; set; }
        public long ProcessoId { get; set; }
        [JsonIgnore]
        public Processo? Processo { get; set; }
        public string? Descricao { get; set; }
        public DateTime DataInclusao { get; set; } = DateTime.UtcNow;
        public DateTime DataAlteracao { get; set; } = DateTime.UtcNow;
    }
}
