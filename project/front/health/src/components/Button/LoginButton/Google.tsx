import classnames from 'classnames/bind';
import type { ButtonHTMLAttributes } from 'react';

import IconGoogle from '@/assets/svg/google.svg';

import styles from '../Button.module.scss';

const cx = classnames.bind(styles);

type KakaoButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function KakaoButton(props: KakaoButtonProps) {
  return (
    <button {...props} className={cx(['google', 'large'])}>
      <img src={IconGoogle} alt="카카오로 시작하기" />
      구글로 시작하기
    </button>
  );
}
