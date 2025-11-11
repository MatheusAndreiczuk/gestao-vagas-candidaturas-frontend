import React, { ComponentPropsWithoutRef, forwardRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
    label?: string;
    istextarea?: boolean;
    required?: boolean;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ required, label, istextarea, ...rest }, ref) => {
        return (
            <div className="flex flex-col">
                <label className="pl-1 mb-1 font-medium text-gray-700">
                    {required && <span className='text-red-600 pr-1'>*</span>}{label}
                </label>
                {istextarea ? (
                    <textarea
                        {...(rest as ComponentPropsWithoutRef<"textarea">)}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        className={"border rounded-md p-2"}
                    />
                ) : (
                    <input
                        {...rest}
                        ref={ref as React.Ref<HTMLInputElement>}
                        className={"border rounded-md p-2 w-full"}
                    />
                )}
            </div>
        )
    }
)

Input.displayName = 'Input';