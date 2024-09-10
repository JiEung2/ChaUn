import classnames from 'classnames/bind';
import type {ButtonHTMLAttributes, PropsWithChildren} from 'react';

import style from './Button.module.scss';

type GeneralButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> &
  ButtonStyle;

const cx = classnames.bind(style);

export default function GeneralButton({
  children,
  disabled,
  buttonStyle,
  ...props
}: PropsWithChildren<GeneralButtonProps>) {
  return (
    <button
      className={cx(['button', {disabled}, ...Object.values(buttonStyle)])}
      {...props}
    >
      {children}
    </button>
  );
}
