const PDFDocument = require("pdfkit");
const fs = require("fs");

class PdfService {
  static generatePdfQuotation = (
    customerName,
    product,
    quantity
  ) => {
    const doc = new PDFDocument();
    try {
      const dir = "./public/uploads/quotations";

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const filePath = `${dir}/quotation_${Date.now()}_${Math.floor(
        100000 + Math.random() * 900000
      )}.pdf`;

      doc.pipe(fs.createWriteStream(filePath));

      doc.fontSize(20).text("Quotation", { align: "center" });
      doc.moveDown();
      doc
        .fontSize(12)
        .text(`Customer Name: ${customerName}`, { align: "left" });

      doc.moveDown();

      doc
        .text("Product Name", { continued: true })
        .text("Quantity", { align: "center", continued: true })
        .text("Price", { align: "right" });
      doc.moveDown();

      doc
        .text(product.name, { continued: true })
        .text(quantity, { align: "center", continued: true })
        .text(product.price, { align: "right" });
      doc.moveDown();

      const totalPrice = product.price * quantity;
      doc
        .moveDown()
        .fontSize(15)
        .text(`Total: $${totalPrice.toFixed(2)}`, { align: "right" });

      doc.end();

      return { filePath: filePath.replace(/^\.\//, "") };
    } catch (error) {
      doc.end();
      console.error(error);
      return { error };
    }
  };
}

module.exports = PdfService;