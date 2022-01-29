import { SUPPORTED_LANGUAGES } from '../constants';
import { generateExtendsTypeForClass, getImportStatements } from '../language-commons/classLevel';
import { fieldTypeConvertor, getCurrentImports, requiredTypeConvertor } from '../language-commons/fieldLevel';
import { ClassFileFormat, Field, GenericsType } from '../types';

const appendRequired = (fieldStr: string, requiredParam: string) => {
    if (fieldStr.indexOf('(') < 0) {
        return `${fieldStr}(${requiredParam})`
    }
    const otherFieldExist = !(fieldStr.indexOf('()') >= 0);
    return fieldStr
        .substring(0, fieldStr.length - 1)
        .concat(`${otherFieldExist ? ',' : ''}${requiredParam}`)
        .concat(fieldStr.substring(fieldStr.length - 1));
};

const getPythonVariableLine = (name: string, field: Field) => {
    const requiredParam = requiredTypeConvertor(field.required, SUPPORTED_LANGUAGES.PYTHON);
    return appendRequired(`\t${name} = ${fieldTypeConvertor(field, SUPPORTED_LANGUAGES.PYTHON)}`, requiredParam);
    // return (
    //     '\n' +
    //     requiredTypeConvertor(field.required, SUPPORTED_LANGUAGES.PYTHON) +
    //     'public ' +
    //     fieldTypeConvertor(field, SUPPORTED_LANGUAGES.PYTHON) +
    //     ' ' +
    //     name +
    //     ';'
    // );
};

export const generateInterfaceForPy = (classFileFormat: ClassFileFormat, className: string) => {
    const { extendsType, genericTypes: genericType, fields } = classFileFormat;
    let interfaceBody = `class ${className}(${generateExtendsTypeForClass(extendsType, SUPPORTED_LANGUAGES.PYTHON)}):`;

    const fieldKeys = Object.keys(fields);
    for (let i = 0; i < fieldKeys.length; i++) {
        interfaceBody = interfaceBody.concat('\n' + getPythonVariableLine(fieldKeys[i], fields[fieldKeys[i]]));
    }

    return getImportStatements(getCurrentImports(), SUPPORTED_LANGUAGES.PYTHON).concat(interfaceBody);
};
