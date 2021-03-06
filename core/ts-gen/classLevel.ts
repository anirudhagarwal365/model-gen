import { Field, GenericsType } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { fieldTypeConvertor } from '../language-commons/fieldLevel';
import { replaceAll } from '../utils/utils';

export const generateGenericTypesForTsClass = (genericTypes: GenericsType[]) => {
    let genericTypeStr = '<';
    genericTypes.forEach((genericType) => {
        genericTypeStr = genericTypeStr.concat(genericType.name);
        if (genericType.bounds) {
            genericTypeStr = genericTypeStr + ' extends ' + fieldTypeConvertor(genericType.bounds, SUPPORTED_LANGUAGES.TYPESCRIPT);
        }
        genericTypeStr = genericTypeStr.concat(',')
    });

    return genericTypeStr + '>';
};

export const generateExtendsTypeForTsClass = (extendsType?: Field) => {
    if (extendsType) {
        return `extends ${fieldTypeConvertor(extendsType, SUPPORTED_LANGUAGES.TYPESCRIPT)}`;
    }
    return '';
};

export const getImportStatementsForTs = (imports: Set<string>) => {
    let importStatementsStr = '';
    imports.forEach((importVal) => {
        const tsImportVal = replaceAll(importVal, '.', '/');
        importStatementsStr = importStatementsStr.concat(`import {${tsImportVal.split('/').pop()}} from '${tsImportVal}'; \n`);
    });
    return importStatementsStr;
};
