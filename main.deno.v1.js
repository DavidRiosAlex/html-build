// deno version

async function html_build(html,obj){

    return new Promise(async (res,rej)=>{
        try{

            let data = obj;
            html = await html;
            const regexp = /\%{.*?}%/;
            let htmlToString = html.replace(/\n/g,'');
            let checkForScripts = true, finded_syntax = '';

            while(checkForScripts){
                [finded_syntax,checkForScripts] = await find_sintax(htmlToString);
                let result = new Function('data',finded_syntax);
                htmlToString = htmlToString.replace(regexp,result(data));
            }
            res(htmlToString)
        }
        catch(err){
            rej(err)
        }
    })

}

const find_sintax = (html)=> new Promise((res,rej)=>{
    try{
        let script_evaluate = '';
        let newScripts = false;
        let detect_sintax = false;
        for (let index = 0; index < html.length ; index ++){

            if ((html[index-1] === '%' && html[index] === '{')){
                newScripts = true;
                index ++;
                detect_sintax = true
            }

            else if (html[index] === '}' && html[index + 1] ==='%'){
                detect_sintax = false;
                break
            }

            if (detect_sintax){
                script_evaluate += html[index];
            }
        }
        if (detect_sintax) throw new Error(" script doesn't close ");

        res([script_evaluate,newScripts]);
    }
    catch(err){
        rej(err)
    }
})


export default html_build;