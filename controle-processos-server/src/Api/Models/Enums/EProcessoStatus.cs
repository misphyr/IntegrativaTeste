using System.ComponentModel;

namespace Api.Models.Enums
{
    public enum EProcessoStatus
    {
        [Description("Em Andamento")]
        EmAndamento = 1,

        [Description("Suspenso")]
        Suspenso = 2,

        [Description("Encerrado")]
        Encerrado = 3,
    }
}
