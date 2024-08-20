import FormItem from "./FormItem";
import Input from "./Input";
import InputSwitch from "./InputSwitch";
import Label from "./Label";
import Select from "./Select";

interface IFormInputProps {
    label: string;
    type: 'text' | 'password' | 'email' | 'number' | 'date' | 'select' | 'switch';
    value: any;
    placeholder?: string;
    options?: any[];
    optionsLabel?: string;
    disabled?: boolean;
    required?: boolean;
    onChange: (e: any) => void;
}

export default function FormInput(props: IFormInputProps) {
    return (
        <FormItem>
            <Label>{props.label}</Label>
            {props.type === 'select' ? (
                <Select value={props.value} onChange={props.onChange} options={props.options} optionLabel={props.optionsLabel}
                    required={props.required} disabled={props.disabled}></Select>
            ) : props.type === 'switch' ? (
                <InputSwitch value={props.value} onChange={props.onChange}></InputSwitch>
            ) : (
                <Input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder}
                    required={props.required} disabled={props.disabled} />
            )}
        </FormItem>
    )
}