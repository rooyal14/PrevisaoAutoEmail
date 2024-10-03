const path = require('path');
const fs = require('fs');

class FileController {

    constructor(date = new Date(), estado = '') {
        // Initializing the properties for the instance
        this.date = date;
        this.estado = estado.toUpperCase();
        this.fileName = this.formatToFileString(this.date, this.estado);
        this.monthFolder = this.formatToMonthFolderString(date);
        this.baseFolder = this.getBasePath(this.estado);
        this.fileUrl = this.getFullFilePath(this.date, this.baseFolder, this.monthFolder, this.fileName);
        
    }


    getBasePath(estado) {
        const varName = `BASE_${estado}`;
        return process.env[varName];
    }

    getFullFilePath(date, baseFolder, monthFolder, fileName) {
        return path.join(baseFolder, date.getFullYear().toString(), monthFolder, fileName);
    }

    formatToMonthFolderString(date) {

        //Pega a descrição em texto do mês
        let monthDesc = date.toLocaleString('pt-BR', { month: 'long' });
        monthDesc = monthDesc.charAt(0).toUpperCase() + monthDesc.slice(1);
    
        //pegar nomero do mês atual
        const currentMonth = date.getMonth() + 1;
        //formatar string do numero mês
        const monthNumberString = currentMonth.toString().padStart(2, '0');
    
        const monthFullString = monthNumberString+"_"+monthDesc
    
        return monthFullString;
    }
    
    formatToFileString(date, estado) {
    
        //Pega dia da data
        const day = date.getDate();
        //formata string do dia de hoje
        const dayString = day.toString().padStart(2, '0');
        
        //Pega dia de hoje
        const month = date.getMonth() + 1;
        //formata string do dia de hoje
        const monthString = month.toString().padStart(2, '0');
    
        //pegar nomero do mês atual
        const year = date.getFullYear();
        //formatar string do numero mês
        const yearString = year.toString().slice(-2);
    
        const currentFullDateString = dayString + monthString + yearString;
    
        const fullFileString = estado + currentFullDateString + ".pdf"
        
        return fullFileString;
    }

    doesFileExists(){
        return fs.existsSync(this.fileUrl);

    }


}

module.exports = FileController;
