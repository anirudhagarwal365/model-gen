import { ENUM_TYPE, FIELD_TYPES } from '../constants';
import { Field } from '../types';
import { getCurrentImports } from '../language-commons/fieldLevel';

export const requiredTypeConvertorForTs = (required: boolean) => {
    if (!required) {
        return '?';
    }
    return '';
};

export const convertTypeToPackageForTs = (type: string) => {
    getCurrentImports().add(`@root/${type}`);
    return type.split('.').pop() ?? '';
};

export const convertTypeAndGenericTypesForTs = (type: string, genericTypes: Field[] | undefined) => {
    if (genericTypes) {
        let genericTypeStr = '';
        genericTypes.forEach((genericType: Field, index: number) => {
            genericTypeStr = genericTypeStr.concat(fieldTypeConvertorForTs(genericType));
            if (index !== genericTypes.length - 1) {
                genericTypeStr = genericTypeStr.concat(',');
            }
        });
        return `${convertTypeToPackageForTs(type)}<${genericTypeStr}>`;
    }
    return convertTypeToPackageForTs(type);
};

export const fieldTypeConvertorForTs = (field: Field): string => {
    const { fieldType, type } = field;
    switch (fieldType) {
        case FIELD_TYPES.STRING:
            return 'string';
        case FIELD_TYPES.BOOLEAN:
            return 'boolean';
        case FIELD_TYPES.INTEGER:
        case FIELD_TYPES.LONG:
        case FIELD_TYPES.FLOAT:
            return 'number';
        case FIELD_TYPES.LIST: {
            if (field.genericTypes) {
                return `${fieldTypeConvertorForTs(field.genericTypes[0])}[]`;
            }
            return 'any[]';
        }
        case FIELD_TYPES.MAP: {
            if (field.genericTypes) {
                return `Record<${fieldTypeConvertorForTs(field.genericTypes[0])}, ${fieldTypeConvertorForTs(field.genericTypes[1])}>`;
            }
            return 'Record<any, any>';
        }
        case FIELD_TYPES.OBJECT: {
            if (field.type) {
                return convertTypeAndGenericTypesForTs(field.type, field.genericTypes);
            }
            return 'any';
        }
        case FIELD_TYPES.GENERIC: {
            if (type) {
                return type;
            }
            return 'any';
        }
        default:
            throw 'Unsupported Field Type' + field.fieldType;
    }
};

export const enumNameConvertorForTs = (names: string[], type?: ENUM_TYPE): string => {
    let enumFields = '';
    names.forEach((name) => {
        if (ENUM_TYPE.NAME === type) {
            enumFields = enumFields.concat(`${name} = '${name}',\n`);
        } else {
            enumFields = enumFields.concat(`${name},\n`);
        }
    });
    return enumFields;
};
