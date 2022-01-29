import { getCurrentImports } from '../language-commons/fieldLevel';
import { Field } from '../types';
import { FIELD_TYPES } from '../constants';

const addToImports = (importStr: string) => {
    getCurrentImports().add(importStr);
};

export const requiredTypeConvertorForJava = (required: boolean) => {
    if (required) {
        return '@Nonnull\n';
    }
    return '@Nullable\n';
};

export const convertTypeToPackageForJava = (type: string) => {
    getCurrentImports().add(`${type}`);
    return type.split('.').pop() ?? '';
};

export const convertTypeAndGenericTypesForJava = (type: string, genericTypes: Field[] | undefined) => {
    if (genericTypes) {
        let genericTypeStr = '';
        genericTypes.forEach((genericType: Field, index: number) => {
            genericTypeStr = genericTypeStr.concat(fieldTypeConvertorForJava(genericType));
            if (index !== genericTypes.length - 1) {
                genericTypeStr = genericTypeStr.concat(',');
            }
        });
        return `${convertTypeToPackageForJava(type)}<${genericTypeStr}>`;
    }
    return convertTypeToPackageForJava(type);
};

export const fieldTypeConvertorForJava = (field: Field): string => {
    const { fieldType, type } = field;
    switch (fieldType) {
        case FIELD_TYPES.STRING:
            return 'String';
        case FIELD_TYPES.BOOLEAN:
            return 'Boolean';
        case FIELD_TYPES.INTEGER:
            return 'Integer';
        case FIELD_TYPES.LONG:
            return 'Long';
        case FIELD_TYPES.FLOAT:
            return 'Float';
        case FIELD_TYPES.LIST: {
            addToImports('java.util.List');
            if (field.genericTypes) {
                return `${fieldTypeConvertorForJava(field.genericTypes[0])}[]`;
            }
            return 'List<Object>';
        }
        case FIELD_TYPES.MAP: {
            addToImports('java.util.Map');
            if (field.genericTypes) {
                return `Map<${fieldTypeConvertorForJava(field.genericTypes[0])}, ${fieldTypeConvertorForJava(field.genericTypes[1])}>`;
            }
            return 'Map<Object, Object>';
        }
        case FIELD_TYPES.OBJECT: {
            if (field.type) {
                return convertTypeAndGenericTypesForJava(field.type, field.genericTypes);
            }
            return 'Object';
        }
        case FIELD_TYPES.GENERIC: {
            if (type) {
                return type;
            }
            return 'Object';
        }
        default:
            throw 'Unsupported Field Type' + field.fieldType;
    }
};
