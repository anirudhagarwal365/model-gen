import { SUPPORTED_LANGUAGES } from '../constants';
import { generateExtendsTypeForPyClass, generateGenericTypesForPyClass, getImportStatementsForPy } from '../py-gen/classLevel';
import { generateExtendsTypeForTsClass, generateGenericTypesForTsClass, getImportStatementsForTs } from '../ts-gen/classLevel';
import { Field, GenericsType } from '../types';
import { generateGenericTypesForJavaClass, generateExtendsTypeForJavaClass, getImportStatementsForJava } from '../java-gen/classLevel';

export const generateGenericTypesForClass = (genericTypes: GenericsType[] | undefined, language: SUPPORTED_LANGUAGES) => {
    if (genericTypes) {
        switch (language) {
            case SUPPORTED_LANGUAGES.TYPESCRIPT:
                return generateGenericTypesForTsClass(genericTypes);
            case SUPPORTED_LANGUAGES.PYTHON:
                return generateGenericTypesForPyClass(genericTypes);
            case SUPPORTED_LANGUAGES.JAVA:
                return generateGenericTypesForJavaClass(genericTypes);
            default:
                throw 'Unsupported language - ' + language;
        }
    }
    return '';
};

export const generateExtendsTypeForClass = (extendsType: Field | undefined, language: SUPPORTED_LANGUAGES) => {
    switch (language) {
        case SUPPORTED_LANGUAGES.TYPESCRIPT:
            return generateExtendsTypeForTsClass(extendsType);
        case SUPPORTED_LANGUAGES.PYTHON:
            return generateExtendsTypeForPyClass(extendsType);
        case SUPPORTED_LANGUAGES.JAVA:
            return generateExtendsTypeForJavaClass(extendsType);
        default:
            throw 'Unsupported language - ' + language;
    }
};

export const getImportStatements = (imports: Set<string>, language: SUPPORTED_LANGUAGES) => {
    switch (language) {
        case SUPPORTED_LANGUAGES.TYPESCRIPT:
            return getImportStatementsForTs(imports);
        case SUPPORTED_LANGUAGES.PYTHON:
            return getImportStatementsForPy(imports);
        case SUPPORTED_LANGUAGES.JAVA:
            return getImportStatementsForJava(imports);
        default:
            throw 'Unsupported language - ' + language;
    }
};
