import classnames from 'classnames/bind';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import style from './Button.module.scss';

type GeneralButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  buttonStyle: { style: string; size: string };
};

const cx = classnames.bind(style);

export default function GeneralButton({
  children,
  disabled,
  buttonStyle,
  className, // 이 props는 optional, 없으면 undefined로 처리
  ...props
}: PropsWithChildren<GeneralButtonProps>) {
  return (
    <button
      className={cx(
        'button',
        { disabled },
        ...Object.values(buttonStyle),
        className 
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
