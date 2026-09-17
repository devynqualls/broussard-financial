import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost' | 'outline';

interface BaseProps {
  variant?: ButtonVariant;
  className?: string;
}

interface AnchorProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  type?: never;
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

type Props = AnchorProps | ButtonProps;

export function Button({ variant = 'primary', className = '', ...rest }: Props) {
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(' ');

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    if (href.startsWith('/')) {
      return <Link to={href} className={cls} {...anchorRest} />;
    }
    return <a href={href} className={cls} {...anchorRest} />;
  }

  return <button className={cls} {...(rest as ButtonProps)} />;
}
