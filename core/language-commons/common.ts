import { SUPPORTED_LANGUAGES } from '../constants';
import { writeToFile } from '../fileSystem';
import { generateInterfaceForPy } from '../py-gen/PYgenerator';
import { generateInterfaceForTs } from '../ts-gen/TSgenerator';
import { ClassFileFormat } from '../types';
import { clearImports } from './fieldLevel';

const identifier = 'core/dataTypes';

export const generateInterface = (classFileFormat: ClassFileFormat, className: string, filePath: string) => {
    clearImports();

    let fileContent = '';
    let relativeFilePath = '';
    Object.keys(SUPPORTED_LANGUAGES).forEach((language) => {
        // @ts-ignore
        const supportedLanguage: SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES[language];
        console.log('🚀 ~ file: common.ts ~ line 18 ~ Object.keys ~ supportedLanguage', supportedLanguage);
        switch (supportedLanguage) {
            case SUPPORTED_LANGUAGES.TYPESCRIPT: {
                console.log('hello');
                fileContent = generateInterfaceForTs(classFileFormat, className);
                relativeFilePath = filePath.substring(filePath.lastIndexOf(identifier) + identifier.length + 1).replace('json', 'ts');
                writeToFile(relativeFilePath, fileContent, supportedLanguage);
                break;
            }
            case SUPPORTED_LANGUAGES.PYTHON: {
                console.log('hello 1');
                fileContent = generateInterfaceForPy(classFileFormat, className);
                relativeFilePath = filePath.substring(filePath.lastIndexOf(identifier) + identifier.length + 1).replace('json', 'py');
                writeToFile(relativeFilePath, fileContent, supportedLanguage);
                break;
            }
            default:
                throw 'Unsupported language - ' + language;
        }
    });
};
