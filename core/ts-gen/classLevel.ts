import { Field, GenericsType } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { fieldTypeConvertor } from '../language-commons/fieldLevel';

export const generateGenericTypesForTsClass = (genericType: GenericsType) => {
    let genericTypeStr = `<${genericType.name}`;
    if (genericType.bounds) {
        genericTypeStr = genericTypeStr + ' extends ' + fieldTypeConvertor(genericType.bounds, SUPPORTED_LANGUAGES.TYPESCRIPT);
    }
    return genericType + '>';
};

export const generateExtendsTypeForTsClass = (extendsType: Field) => {
    return `extends ${fieldTypeConvertor(extendsType, SUPPORTED_LANGUAGES.TYPESCRIPT)}`;
};

export const getImportStatementsForTs = (imports: Set<string>) => {
    let importStatementsStr = '';
    imports.forEach((importVal) => {
        importStatementsStr = importStatementsStr.concat(`import {${importVal.split('/').pop()}} from '${importVal}'; \n`);
    });
    return importStatementsStr;
};
