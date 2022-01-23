import { SUPPORTED_LANGUAGES } from '../constants';
import { generateExtendsTypeForPyClass, generateGenericTypesForPyClass, getImportStatementsForPy } from '../py-gen/classLevel';
import { generateExtendsTypeForTsClass, generateGenericTypesForTsClass, getImportStatementsForTs } from '../ts-gen/classLevel';
import { Field, GenericsType } from '../types';

export const generateGenericTypesForClass = (genericType: GenericsType | undefined, language: SUPPORTED_LANGUAGES) => {
    if (genericType) {
        switch (language) {
            case SUPPORTED_LANGUAGES.TYPESCRIPT:
                return generateGenericTypesForTsClass(genericType);
            case SUPPORTED_LANGUAGES.PYTHON:
                return generateGenericTypesForPyClass(genericType);
            default:
                throw 'Unsupported language - ' + language;
        }
    }
    return '';
};

export const generateExtendsTypeForClass = (extendsType: Field | undefined, language: SUPPORTED_LANGUAGES) => {
    if (extendsType) {
        switch (language) {
            case SUPPORTED_LANGUAGES.TYPESCRIPT:
                return generateExtendsTypeForTsClass(extendsType);
            case SUPPORTED_LANGUAGES.PYTHON:
                return generateExtendsTypeForPyClass(extendsType);
            default:
                throw 'Unsupported language - ' + language;
        }
    }
    return '';
};

export const getImportStatements = (imports: Set<string>, language: SUPPORTED_LANGUAGES) => {
    switch (language) {
        case SUPPORTED_LANGUAGES.TYPESCRIPT:
            return getImportStatementsForTs(imports);
        case SUPPORTED_LANGUAGES.PYTHON:
            return getImportStatementsForPy(imports);
        default:
            throw 'Unsupported language - ' + language;
    }
};
