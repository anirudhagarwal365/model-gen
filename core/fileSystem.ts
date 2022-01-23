import { SUPPORTED_LANGUAGES } from './constants';
const fs = require('fs');
const path = require('path');

const baseFolder = 'generated/';

const prettier = require('prettier');

const deleteFolderRecursive = function (directoryPath: string) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file: string, index: number) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
};

function ensureDirectoryExistence(filePath: string) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

export const writeToFile = (relativeFilePath: string, data: string, language: SUPPORTED_LANGUAGES) => {
    const generatedOutputFolder = `generated/${language}/root/`;
    const outputFileName = generatedOutputFolder + relativeFilePath;
    ensureDirectoryExistence(outputFileName);
    let formattedData = data;
    if (outputFileName.indexOf('.ts') > 0) {
        formattedData = prettier.format(data, { filepath: outputFileName });
    }
    fs.writeFileSync(outputFileName, formattedData);
};

export const getAllJsonFiles = (dir: string) => {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    let i = 0;
    (function next() {
        var file = list[i++];
        if (!file) return results;
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            const res = getAllJsonFiles(file);
            results = results.concat(res);
            next();
        } else {
            results.push(file);
            next();
        }
    })();
    return results;
};

export const cleanGenerated = () => {
    // deleteFolderRecursive(generatedTypescriptFolder);
};
