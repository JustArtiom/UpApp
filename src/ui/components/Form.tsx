import { forwardRef, AllHTMLAttributes, ButtonHTMLAttributes } from "react";
import Button, { ButtonProps } from "./Button";
import { cn } from "~/utils";
import Input, { InputProps } from "./Input";
import Checkbox, { CheckboxProps } from "./Checkbox";

type FormAttributesTypes =
    | { type: "title"; attributes?: AllHTMLAttributes<HTMLParagraphElement> }
    | { type: "input"; attributes?: InputProps }
    | { type: "button"; attributes?: ButtonProps }
    | { type: "checkbox"; attributes?: CheckboxProps }
    | {
          type: "inline";
          className?: string;
          attributes: FormAttributesTypes[];
      };

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    attributes: FormAttributesTypes[];
}

const MapElements = (items: FormAttributesTypes[]) => {
    return items.map((item, index) => {
        if (item.type === "inline")
            return (
                <div
                    className={cn(
                        "w-full flex flex-row flex-wrap",
                        item.className
                    )}
                    key={index}
                >
                    {MapElements(item.attributes)}
                </div>
            );

        if (item.type === "title")
            return (
                <p
                    key={index}
                    className={cn(
                        "text-2xl font-bold text-center",
                        item?.attributes?.className
                    )}
                >
                    {item?.attributes?.children || "No children"}
                </p>
            );

        if (item.type === "input")
            return <Input key={index} {...item?.attributes} />;

        if (item.type === "button")
            return (
                <Button key={index} {...item?.attributes}>
                    {item.attributes?.children || "Submit"}
                </Button>
            );

        if (item.type == "checkbox") {
            return (
                <Checkbox
                    key={index}
                    {...item?.attributes}
                    divClassName={cn("m-2", item.attributes?.divClassName)}
                />
            );
        }
        return null;
    });
};

const Form = forwardRef<HTMLFormElement, FormProps>(
    ({ attributes, ...rest }, ref) => {
        return (
            <form
                ref={ref}
                {...rest}
                className={cn("flex flex-col gap-3", rest?.className)}
            >
                {MapElements(attributes)}
            </form>
        );
    }
);

export default Form;
