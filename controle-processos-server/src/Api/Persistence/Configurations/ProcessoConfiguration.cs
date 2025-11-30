using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistence.Configurations
{
    public class ProcessoConfiguration : IEntityTypeConfiguration<Processo>
    {
        public void Configure(EntityTypeBuilder<Processo> builder)
        {
            builder.ToTable(nameof(Processo)).HasKey(p => p.Id);
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.NumeroProcesso).HasMaxLength(24).IsRequired();
            builder.Property(p => p.Autor).HasMaxLength(255).IsRequired();
            builder.Property(p => p.Reu).HasMaxLength(255).IsRequired();
            builder.Property(p => p.DataAjuizamento).HasColumnType("timestamptz");
            builder.Property(p => p.Status).IsRequired();
            builder.Property(p => p.Descricao).HasMaxLength(5000);
            builder.Property(p => p.DataInclusao).HasColumnType("timestamptz").IsRequired();
            builder.HasMany(p => p.Historicos).WithOne(h => h.Processo).HasForeignKey(h => h.ProcessoId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
