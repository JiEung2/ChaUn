import classnames from 'classnames/bind';
import type { ButtonHTMLAttributes } from 'react';

import IconKakao from '@/assets/svg/kakao.svg';

import styles from '../Button.module.scss';

const cx = classnames.bind(styles);

type KakaoButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function KakaoButton(props: KakaoButtonProps) {
  return (
    <button {...props} className={cx(['kakao', 'large'])}>
      <img src={IconKakao} alt="카카오로 시작하기" />
      카카오로 시작하기
    </button>
  );
}
