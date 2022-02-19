using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularStore.Models;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public string Name { get; set; }
    //[Column(TypeName = "money")]
    public decimal Price { get; set; }
    public string Category {  get; set; }
    public string Barcode { get; set; }
    public string Description { get; set; }
}
