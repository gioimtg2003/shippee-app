import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  useController,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface IControlledFormProps {
  control: Control<any, any>;
  label?: string;
  description?: string | ReactNode;
  name: string;
  optional?: boolean;
  containerClassName?: string;
  className?: string;
}

export interface IBaseFormProps extends IControlledFormProps {
  render: (field: ControllerRenderProps<FieldValues, string>) => JSX.Element;
}

export const BaseForm = (props: IBaseFormProps) => {
  const { control, label, description, name, optional, containerClassName } =
    props;
  const controller = useController({ name, control });
  const t = useTranslations('common');

  const error = controller.fieldState.error?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={twMerge('w-full', containerClassName)}>
          {label && (
            <span className='flex items-center'>
              <span
                className={twMerge(
                  'mb-1 text-sm font-medium',
                  error ? 'text-red-500' : 'text-zinc-700'
                )}
              >
                {label}
              </span>
              {optional && (
                <span className='text-xs font-light text-gray-400'>
                  &nbsp;({t('optional')} )
                </span>
              )}
            </span>
          )}
          {props.render(field)}
          {description && (
            <p className='mt-1 truncate text-xs text-zinc-400'>{description}</p>
          )}
          {error && (
            <p className='mt-1 truncate text-left text-xs text-red-500'>
              {error}
            </p>
          )}
        </div>
      )}
    />
  );
};
