import { SUPPORTED_LANGUAGES } from '../constants';
import { fieldTypeConvertor } from '../language-commons/fieldLevel';
import { Field, GenericsType } from '../types';

export const generateGenericTypesForPyClass = (genericTypes: GenericsType[]) => {
    return '';
};

export const generateExtendsTypeForPyClass = (extendsType?: Field) => {
    if (extendsType) {
        return fieldTypeConvertor(extendsType, SUPPORTED_LANGUAGES.PYTHON);
    }
    return 'Schema';
};

export const getImportStatementsForPy = (imports: Set<string>) => {
    let importStatementsStr = 'from marshmallow import Schema, fields \n';
    imports.forEach((importVal) => {
        importStatementsStr = importStatementsStr.concat(`from ${importVal} import ${importVal.split('.').pop()}; \n`);
    });
    return importStatementsStr;
};
