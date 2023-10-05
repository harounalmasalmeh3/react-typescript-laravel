import {useTrans} from '@common/i18n/use-trans';
import {useSettings} from '@common/core/settings/use-settings';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {NavbarProps} from '@common/ui/navigation/navbar/navbar';

interface LogoProps {
  isMobile?: boolean | null;
  color?: NavbarProps['color'];
  logoColor?: NavbarProps['logoColor'];
  isDarkMode?: boolean;
}
export function Logo({
  color,
  isMobile = false,
  logoColor,
  isDarkMode,
}: LogoProps) {
  const {trans} = useTrans();
  const {branding} = useSettings();

  let desktopLogo: string;
  let mobileLogo: string;
  if (
    isDarkMode ||
    !branding.logo_dark ||
    (logoColor !== 'dark' && color !== 'bg' && color !== 'bg-alt')
  ) {
    desktopLogo = branding.logo_light;
    mobileLogo = branding.logo_light_mobile;
  } else {
    desktopLogo = branding.logo_dark;
    mobileLogo = branding.logo_dark_mobile;
  }

  const logoUrl = isMobile ? mobileLogo || desktopLogo : desktopLogo;
  if (!logoUrl) {
    return null;
  }

  return (
    <Link
      to="/"
      className={clsx(
        'mr-4 block h-full flex-shrink-0 md:mr-24',
        isMobile ? 'max-h-26' : 'max-h-36'
      )}
      aria-label={trans({message: 'Go to homepage'})}
    >
      <img
        className={clsx(
          'block h-full w-auto',
          isMobile ? 'max-h-26' : 'max-h-36'
        )}
        data-logo="navbar"
        src={logoUrl}
        alt={trans({message: 'Site logo'})}
      />
    </Link>
  );
}
