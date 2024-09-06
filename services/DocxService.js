const { Document, Packer, Paragraph, TextRun, ImageRun } = require("docx");
const fs = require("fs");

class DocxService {
  static generateDocxProposal = async (customer, product) => {
    try {
      const dir = "./public/uploads/proposals";

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Proposal Document",
                    bold: true,
                    size: 30,
                  }),
                ],
                alignment: "center",
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Product Details:",
                    bold: true,
                    size: 24,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `Product: ${product.name}`, bold: true }),
                  new TextRun({
                    text: `\nDescription: ${product.description}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `\nPrice: $${product.price}`,
                    break: 1,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: fs.readFileSync(product.image_url),
                    transformation: {
                      width: 300,
                      height: 150,
                    },
                  }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "Customer Details:",
                    bold: true,
                    size: 24,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Customer: ${customer.name}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: `\nId: ${customer.id}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `\nEmail: ${customer.email}`,
                    break: 1,
                  }),
                ],
                spacing: { after: 200 },
              }),
            ],
          },
        ],
      });

      const filePath = `${dir}/proposal_${Date.now()}.docx`;
      const buffer = await Packer.toBuffer(doc);
      fs.writeFileSync(filePath, buffer);

      return { filePath: filePath.replace(/^\.\//, "") };
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}

module.exports = DocxService;
