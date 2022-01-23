import { CLASS_TYPE } from "./constants";

export interface GenericsType {
    name: string,
    bounds?: Field
}

export interface BaseFileFormat {
    classType: CLASS_TYPE,
}

export interface ClassFileFormat extends BaseFileFormat {
    fields: Record<string, Field>,
    extendsType?: Field,
    genericType?: GenericsType
}

export interface EnumFileFormat extends BaseFileFormat {
    value: string[];
}

export interface Field {
    fieldType: string;
    required: boolean;
    type?: string;
    genericTypes?: Field[];
}