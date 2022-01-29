import { SUPPORTED_LANGUAGES } from '../constants';
import { generateExtendsTypeForClass, generateGenericTypesForClass, getImportStatements } from '../language-commons/classLevel';
import { requiredTypeConvertor, getCurrentImports, fieldTypeConvertor } from '../language-commons/fieldLevel';
import { ClassFileFormat, Field } from '../types';
import { replaceAll } from '../utils/utils';

const getJavaVariableLine = (name: string, field: Field) => {
    return (
        '\n' +
        requiredTypeConvertor(field.required, SUPPORTED_LANGUAGES.JAVA) +
        'public ' +
        fieldTypeConvertor(field, SUPPORTED_LANGUAGES.JAVA) +
        ' ' +
        name +
        ';'
    );
};

const addPackageInfo = (filePath: string) => {
    const currentPackage = replaceAll(filePath.replace('.json', ''), '/', '.');
    return `package ${currentPackage.substring(0, currentPackage.lastIndexOf('.'))};\n\n`;
};

export const generateInterfaceForJava = (classFileFormat: ClassFileFormat, className: string, filePath: string) => {
    const { extendsType, genericTypes: genericType, fields } = classFileFormat;
    let interfaceBody = `public class ${className}${generateGenericTypesForClass(
        genericType,
        SUPPORTED_LANGUAGES.JAVA
    )} ${generateExtendsTypeForClass(extendsType, SUPPORTED_LANGUAGES.JAVA)} {`;

    const fieldKeys = Object.keys(fields);
    for (let i = 0; i < fieldKeys.length; i++) {
        interfaceBody = interfaceBody.concat('\n' + getJavaVariableLine(fieldKeys[i], fields[fieldKeys[i]]));
    }

    interfaceBody = interfaceBody.concat('\n}');
    return addPackageInfo(filePath)
        .concat(getImportStatements(getCurrentImports(), SUPPORTED_LANGUAGES.JAVA))
        .concat('\n')
        .concat(interfaceBody);
};
