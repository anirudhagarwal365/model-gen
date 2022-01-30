import { SUPPORTED_LANGUAGES } from '../constants';
import { generateExtendsTypeForClass, generateGenericTypesForClass, getImportStatements } from '../language-commons/classLevel';
import { requiredTypeConvertor, getCurrentImports, fieldTypeConvertor, enumNameConvertor } from '../language-commons/fieldLevel';
import { ClassFileFormat, Field, EnumFileFormat } from '../types';
import { enumNameConvertorForTs } from './fieldLevel';

const getTypescriptVariableLine = (name: string, field: Field) => {
    return (
        name +
        requiredTypeConvertor(field.required, SUPPORTED_LANGUAGES.TYPESCRIPT) +
        ': ' +
        fieldTypeConvertor(field, SUPPORTED_LANGUAGES.TYPESCRIPT)
    );
};

export const generateInterfaceForTs = (classFileFormat: ClassFileFormat, className: string) => {
    const { extendsType, genericTypes, fields } = classFileFormat;
    let interfaceBody = `export interface ${className}${generateGenericTypesForClass(
        genericTypes,
        SUPPORTED_LANGUAGES.TYPESCRIPT
    )} ${generateExtendsTypeForClass(extendsType, SUPPORTED_LANGUAGES.TYPESCRIPT)} {`;

    const fieldKeys = Object.keys(fields);
    for (let i = 0; i < fieldKeys.length; i++) {
        interfaceBody = interfaceBody.concat('\n' + getTypescriptVariableLine(fieldKeys[i], fields[fieldKeys[i]]));
    }

    interfaceBody = interfaceBody.concat('\n}');
    return getImportStatements(getCurrentImports(), SUPPORTED_LANGUAGES.TYPESCRIPT).concat(interfaceBody);
};

export const generateEnumForTs = (enumFileFormat: EnumFileFormat, enumName: string) => {
    return `export enum ${enumName} {
        ${enumNameConvertor(enumFileFormat, SUPPORTED_LANGUAGES.TYPESCRIPT)}
    }`;
};
