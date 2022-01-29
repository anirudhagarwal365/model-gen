import { SUPPORTED_LANGUAGES } from '../constants';
import { fieldTypeConvertorForPy, requiredTypeConvertorForPy } from '../py-gen/fieldLevel';
import { fieldTypeConvertorForTs, requiredTypeConvertorForTs } from '../ts-gen/fieldLevel';
import { Field } from '../types';
import { fieldTypeConvertorForJava, requiredTypeConvertorForJava } from '../java-gen/fieldLevel';

export const requiredTypeConvertor = (required: boolean, language: SUPPORTED_LANGUAGES) => {
    switch (language) {
        case SUPPORTED_LANGUAGES.TYPESCRIPT:
            return requiredTypeConvertorForTs(required);
        case SUPPORTED_LANGUAGES.PYTHON:
            return requiredTypeConvertorForPy(required);
        case SUPPORTED_LANGUAGES.JAVA:
            return requiredTypeConvertorForJava(required);
        default:
            throw 'Unsupported language - ' + language;
    }
};

let imports = new Set<string>();

export const clearImports = () => {
    imports.clear();
};

export const getCurrentImports = () => {
    return imports;
};

// const convertTypeToPackage = (type: string, language: SUPPORTED_LANGUAGES) => {
//     switch (language) {
//         case SUPPORTED_LANGUAGES.TYPESCRIPT:
//             return convertTypeToPackageForTs(type, imports);
//         case SUPPORTED_LANGUAGES.PYTHON:
//             return convertTypeToPackageForPy(type, imports);
//         default:
//             throw 'Unsupported language - ' + language;
//     }
// };

// const convertTypeAndGenericTypes = (type: string | undefined, genericTypes: Field[] | undefined, language: SUPPORTED_LANGUAGES) => {
//     if (type) {
//         switch (language) {
//             case SUPPORTED_LANGUAGES.TYPESCRIPT:
//                 return convertTypeAndGenericTypesForTs(type, genericTypes);
//             case SUPPORTED_LANGUAGES.PYTHON:
//                 return convertTypeAndGenericTypesForPy(type, genericTypes);
//             default:
//                 throw 'Unsupported language - ' + language;
//         }
//     }
//     throw 'Empty type value';
// };

export const fieldTypeConvertor = (field: Field, language: SUPPORTED_LANGUAGES): string => {
    switch (language) {
        case SUPPORTED_LANGUAGES.TYPESCRIPT:
            return fieldTypeConvertorForTs(field);
        case SUPPORTED_LANGUAGES.PYTHON:
            return fieldTypeConvertorForPy(field);
        case SUPPORTED_LANGUAGES.JAVA:
            return fieldTypeConvertorForJava(field);
        default:
            throw 'Unsupported language - ' + language;
    }
};
