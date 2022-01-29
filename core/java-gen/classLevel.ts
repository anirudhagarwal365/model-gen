import { Field, GenericsType } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { fieldTypeConvertor } from '../language-commons/fieldLevel';

export const generateGenericTypesForJavaClass = (genericTypes: GenericsType[]) => {
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

export const generateExtendsTypeForJavaClass = (extendsType?: Field) => {
    if (extendsType) {
        return `extends ${fieldTypeConvertor(extendsType, SUPPORTED_LANGUAGES.JAVA)}`;
    }
    return '';
};

export const getImportStatementsForJava = (imports: Set<string>) => {
    let importStatementsStr = 'import javax.annotation.Nonnull;\nimport javax.annotation.Nullable;\n';
    imports.forEach((importVal) => {
        importStatementsStr = importStatementsStr.concat(`import ${importVal}; \n`);
    });
    return importStatementsStr;
};
