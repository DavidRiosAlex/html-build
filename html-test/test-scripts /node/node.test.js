import { expect, test } from "@jest/globals";
import html_build from '../../../node';
import fs from 'fs';

test('check if file exist', async ()=>{
    const html_pathname = 'html-test/html-generates/test.html';
    const data = {
        array: [
            {name:'Abigail'},
            {name:'Ruth'},
            {name:'Rios'},
            {name:'Chinita'}
        ],
        test:'probando un test'
    }

    const html = await html_build({
        html_pathname,
        data,
    });

    expect(typeof html).toBe('string');

});

test('check if create file works, and file is created ',async ()=>{

    const props = {
        html_pathname: 'html-test/html-generates/test.html',
        data:{
            array: [
                {name:'Abigail'},
                {name:'Ruth'},
                {name:'Rios'},
                {name:'Chinita'}
            ],
            test:'probando un test'
        },
        generateHtml:1,
        new_file_name: 'testing.html'
    };

    await html_build(props);

    const files_in_directory = await fs.promises.readdir(process.cwd());
    expect(files_in_directory.some( file => file === 'testing.html')).toBeTruthy();

});

test('check empty props',async (done)=>{
    try{
        const props = {};
        expect(await html_build(props)).toThrow(TypeError);
    }
    catch(err){
        done(expect(err).toMatch("the input value is undefined or it doesn't have html_pathname & data keys"))
    }
});

