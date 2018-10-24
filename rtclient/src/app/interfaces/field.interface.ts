export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: any[];
    okText?: string;
    cancelText?: string;
    collections?: any;
    type: string;
    value?: any;
    ionIconName?: string;
    iconOnly?: boolean;
    color?: string;
    btnType?: string;
    dateDisplayFormat?: string;
    datePickerFormat?: string;
    isChecked?: boolean;
    esInvisible?: boolean;
    validations?: Validator[];
}
