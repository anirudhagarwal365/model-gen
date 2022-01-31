import { exec } from 'child_process';
import { SUPPORTED_LANGUAGES, BASE_FOLDER } from '../constants';
import { writeToFile } from '../fileSystem';
import { generateInterfaceForJava } from '../java-gen/JavaGenerator';
import { generateEnumForPy, generateInterfaceForPy } from '../py-gen/PYgenerator';
import { generateEnumForTs, generateInterfaceForTs } from '../ts-gen/TSgenerator';
import { ClassFileFormat, EnumFileFormat } from '../types';
import { clearImports } from './fieldLevel';

const identifier = 'core/dataTypes';

export const generateInterface = (classFileFormat: ClassFileFormat, className: string, filePath: string) => {
    Object.keys(SUPPORTED_LANGUAGES).forEach((language) => {
        clearImports();
        // @ts-ignore
        const supportedLanguage: SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES[language];
        switch (supportedLanguage) {
            case SUPPORTED_LANGUAGES.TYPESCRIPT: {
                const fileContent = generateInterfaceForTs(classFileFormat, className);
                const relativeFilePath = filePath.substring(filePath.lastIndexOf(identifier) + identifier.length + 1).replace('json', 'ts');
                writeToFile(relativeFilePath, fileContent, supportedLanguage);
                break;
            }
            case SUPPORTED_LANGUAGES.PYTHON: {
                const fileContent = generateInterfaceForPy(classFileFormat, className);
                const relativeFilePath = filePath.substring(filePath.lastIndexOf(identifier) + identifier.length + 1).replace('json', 'py');
                writeToFile(relativeFilePath, fileContent, supportedLanguage);
                break;
            }
            case SUPPORTED_LANGUAGES.JAVA: {
                const fileContent = generateInterfaceForJava(
                    classFileFormat,
                    className,
                    filePath.substring(filePath.lastIndexOf(identifier) + identifier.length + 1)
                );
                const relativeFilePath = filePath
                    .substring(filePath.lastIndexOf(identifier) + identifier.length + 1)
                    .replace('json', 'java');
                writeToFile(relativeFilePath, fileContent, supportedLanguage);
                break;
            }
            default:
            // throw 'Unsupported language - ' + language;
        }
    });
};

export const generateEnum = (enumFileFormat: EnumFileFormat, className: string, filePath: string) => {
    Object.keys(SUPPORTED_LANGUAGES).forEach((language) => {
        clearImports();
        // @ts-ignore
        const supportedLanguage: SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES[language];
        switch (supportedLanguage) {
            case SUPPORTED_LANGUAGES.TYPESCRIPT: {
                const fileContent = generateEnumForTs(enumFileFormat, className);
                const relativeFilePath = filePath.substring(filePath.lastIndexOf(identifier) + identifier.length + 1).replace('json', 'ts');
                writeToFile(relativeFilePath, fileContent, supportedLanguage);
                break;
            }
            case SUPPORTED_LANGUAGES.PYTHON: {
                const fileContent = generateEnumForPy(enumFileFormat, className);
                const relativeFilePath = filePath.substring(filePath.lastIndexOf(identifier) + identifier.length + 1).replace('json', 'py');
                writeToFile(relativeFilePath, fileContent, supportedLanguage);
                break;
            }
            case SUPPORTED_LANGUAGES.JAVA: {
                break;
            }
            default:
            // throw 'Unsupported language - ' + language;
        }
    });
};

export const formatGeneratedFiles = function() {
    Object.keys(SUPPORTED_LANGUAGES).forEach((language) => {
        // @ts-ignore
        const supportedLanguage: SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES[language];
        switch (supportedLanguage) {
            case SUPPORTED_LANGUAGES.TYPESCRIPT: {
                break
            }
            case SUPPORTED_LANGUAGES.PYTHON: {
                exec(`autopep8 --in-place --aggressive --aggressive -r ${BASE_FOLDER}/${SUPPORTED_LANGUAGES.PYTHON}`, function(err: any, stdout: any) {
                    if (err) {
                        console.error(err)
                    }
                    console.log(stdout);
                });                
            }
            case SUPPORTED_LANGUAGES.JAVA: {
                break;
            }
            default:
            // throw 'Unsupported language - ' + language;
        }
    });
}