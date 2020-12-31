// node version
import fs from 'fs';
import path from 'path';

export default async function main ({html_pathname, data, generateHtml,new_file_name}){
    return new Promise( async (res,rej) =>{
        try{
            if (!(html_pathname && data)) throw "the input value is undefined or it doesn't have html_pathname & data keys";

            const fullpath = path.join(process.cwd(),html_pathname);
            const file = await fsReadFileHtml(fullpath);
        
            const parserHTML = new DOMParser();
            const mountDom = parserHTML.parseFromString(file, 'text/html');
        
            const elementsToResolve = mountDom.getElementsByTagName('render-in');
            const number_elements = elementsToResolve.length;
        
            let executingscript;
        
            for (let element = 0; element < number_elements; element ++){
                executingscript = new Function('data',elementsToResolve[0].innerHTML);
                elementsToResolve[0].outerHTML = executingscript(data);
            }
        
            if (generateHtml){
                fs.promises.writeFile(`${process.cwd()}/${new_file_name}`,mountDom.documentElement.innerHTML)
            }

            res(mountDom.documentElement.innerHTML);
        }
        catch(err){
            rej(err)
        }
    })
}

const fsReadFileHtml = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, htmlString) => {
            if (!error && htmlString) {
                resolve(htmlString);
            } else {
                reject(error)
            }
        });
    });
}