class EmailController {

    constructor (estado) {
        this.estado = estado;
    }

    customizeHtmlContent(day, estado, htmlTemplate) {
        day.setDate(day.getDate()+1);
        const day1 = day.getDate();
        day.setDate(day.getDate()+1);
        const day2 = day.getDate();
        day.setDate(day.getDate()+1);
        const day3 = day.getDate();
      
        let month = day.toLocaleString('pt-BR', { month: 'long' });
        month = month.charAt(0).toUpperCase() + month.slice(1);
        
        // Load the HTML into Cheerio for manipulation
        const $ = cheerio.load(htmlTemplate);
      
        // Modify the content, similar to how you would with getElementById
        $('.estados').text(estado);
        $('.data').text(`${day1}, ${day2} e ${day3} de ${month}`)
      
        // Get the updated HTML
        htmlContent = $.html();
        return htmlContent;
    }
      
    // Read the HTML file into a variable
    getHtmlFromPath (path) {
        var htmlTemplate = fs.readFileSync(htmlTemplateFilePath, 'utf8', (err, data) => {
        err ? console.error('Error reading HTML file:', err) : data;
    
        });
        return htmlTemplate;
    }
}