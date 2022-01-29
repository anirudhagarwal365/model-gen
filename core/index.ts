import { generateInterfaceForTs } from './ts-gen/TSgenerator';
import { BaseFileFormat, ClassFileFormat, EnumFileFormat } from './types';
import { cleanGenerated, getAllJsonFiles } from './fileSystem';
import { CLASS_TYPE } from './constants';
import { generateInterface, generateEnum } from './language-commons/common';

const dataTypesFolder = './core/dataTypes/';

cleanGenerated();

getAllJsonFiles(dataTypesFolder).forEach((filePath) => {
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
    const jsonFile: BaseFileFormat = require(filePath);
    const classType = jsonFile.classType;

    switch (classType) {
        case CLASS_TYPE.CLASS:
            const classFileFormat = jsonFile as ClassFileFormat;
            generateInterface(classFileFormat, fileName, filePath);
            break;
        case CLASS_TYPE.ENUM:
            const enumFileFormat = jsonFile as EnumFileFormat;
            generateEnum(enumFileFormat, fileName, filePath);
            break;
        default:
            throw 'Unsupported class type' + classType;
    }
});
