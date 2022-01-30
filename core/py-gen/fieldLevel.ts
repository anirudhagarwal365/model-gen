import { getCurrentImports } from '../language-commons/fieldLevel';
import { Field } from '../types';
import { ENUM_TYPE, FIELD_TYPES } from '../constants';

export const requiredTypeConvertorForPy = (required: boolean) => {
    if (required) {
        return 'required=True';
    }
    return 'required=False';
};

export const convertTypeToPackageForPy = (type: string) => {
    getCurrentImports().add(`${type}`);
    return type.split('.').pop() ?? '';
};

export const convertTypeAndGenericTypesForPy = (type: string, genericTypes: Field[] | undefined) => {
    if (genericTypes) {
        // TODO: Add this
    }
    return convertTypeToPackageForPy(type);
};

export const fieldTypeConvertorForPy = (field: Field): string => {
    const { fieldType } = field;
    switch (fieldType) {
        case FIELD_TYPES.STRING:
            return 'fields.String()';
        case FIELD_TYPES.BOOLEAN:
            return 'fields.Boolean()';
        case FIELD_TYPES.INTEGER:
        case FIELD_TYPES.LONG:
            return 'fields.Int()';
        case FIELD_TYPES.FLOAT:
            return 'fields.Float()';
        case FIELD_TYPES.LIST: {
            if (field.genericTypes) {
                return `fields.List(${fieldTypeConvertorForPy(field.genericTypes[0])})`;
            }
            return 'fields.List()';
        }
        case FIELD_TYPES.MAP: {
            if (field.genericTypes) {
                return `fields.Dict(${fieldTypeConvertorForPy(field.genericTypes[0])}, ${fieldTypeConvertorForPy(field.genericTypes[1])})`;
            }
            return 'fields.Dict()';
        }
        case FIELD_TYPES.GENERIC:
            return 'fields.Raw()';
        case FIELD_TYPES.OBJECT: {
            if (field.type) {
                return convertTypeAndGenericTypesForPy(field.type, field.genericTypes);
            }
            return 'fields.Raw()';
        }
        default:
            throw 'Unsupported Field Type' + field.fieldType;
    }
};

export const enumNameConvertorForPy = (names: string[], type?: ENUM_TYPE): string => {
    let enumFields = '';
    names.forEach((name, index) => {
        if (ENUM_TYPE.NAME === type) {
            enumFields = enumFields.concat(`\t${name} = "${name}"\n`);
        } else {
            enumFields = enumFields.concat(`\t${name}\n`);
        }
    });
    return enumFields;
};
