using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularStore.Models;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public string Name { get; set; }
    //Would probably store an integer and rename PriceInPence in prod,
    //to avoid rounding errors etc, would just convert pence to pounds & pence
    //as needed. SQLite doesn't have decimal type, best is 64 bit double which tbh,
    //is probably good enough for this but wouldn't be safe in prod
    public decimal Price { get; set; }
    public string Category {  get; set; }
    public string Barcode { get; set; }
    public string Description { get; set; }
}
