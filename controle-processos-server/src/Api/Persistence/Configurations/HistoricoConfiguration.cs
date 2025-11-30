using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistence.Configurations
{
    public class HistoricoConfiguration : IEntityTypeConfiguration<Historico>
    {
        public void Configure(EntityTypeBuilder<Historico> builder)
        {
            builder.ToTable(nameof(Historico)).HasKey(h => h.Id);
            builder.Property(h => h.Id).IsRequired();
            builder.Property(h => h.Descricao).HasMaxLength(5000).IsRequired();
            builder.Property(h => h.DataInclusao).HasColumnType("timestamptz").IsRequired();
            builder.Property(h => h.DataAlteracao).HasColumnType("timestamptz");
        }
    }
}
