import type { ReactNode, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & { size?: number };

function Outline({ size = 24, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

function Solid({ size = 24, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3.5 10.6 12 3.8l8.5 6.8V19a1.6 1.6 0 0 1-1.6 1.6h-4.1V15H9.2v5.6H5.1A1.6 1.6 0 0 1 3.5 19z" />
    </Outline>
  );
}

export function IconHomeFilled(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M3.2 10.3 12 3.2l8.8 7.1V19a1.9 1.9 0 0 1-1.9 1.9h-4.4v-6.4H9.5v6.4H5.1A1.9 1.9 0 0 1 3.2 19z" />
    </Solid>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="8.7" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z" />
    </Outline>
  );
}

export function IconCompassFilled(props: IconProps) {
  return (
    <Solid {...props}>
      <path
        fillRule="evenodd"
        d="M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 0 0 0-19.2m4.9 4.7-2.6 6.3-6.3 2.6 2.7-6.3z"
        clipRule="evenodd"
      />
    </Solid>
  );
}

export function IconLibrary(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M6.2 3.4h11.4A1.6 1.6 0 0 1 19.2 5v15.6l-6.5-3.2-6.5 3.2V5a1.6 1.6 0 0 1 1.6-1.6z" />
      <path d="M9.4 8.2h5.2" />
    </Outline>
  );
}

export function IconLibraryFilled(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M6.2 2.9h11.4a2.1 2.1 0 0 1 2.1 2.1v16.4l-7-3.5-7 3.5V5a2.1 2.1 0 0 1 2.1-2.1z" />
    </Solid>
  );
}

export function IconUser(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="8.2" r="4.1" />
      <path d="M4.4 21c.5-4 3.6-6.3 7.6-6.3s7.1 2.3 7.6 6.3" />
    </Outline>
  );
}

export function IconUserFilled(props: IconProps) {
  return (
    <Solid {...props}>
      <circle cx="12" cy="8.1" r="4.4" />
      <path d="M12 14.1c4.4 0 7.7 2.6 8.2 6.9H3.8c.5-4.3 3.8-6.9 8.2-6.9" />
    </Solid>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="10.9" cy="10.9" r="7" />
      <path d="m16.1 16.1 4.4 4.4" />
    </Outline>
  );
}

export function IconStar(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="m12 2.9 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.9l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
    </Solid>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="8.7" />
      <path d="M12 7.4V12l3.2 2" />
    </Outline>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </Outline>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </Outline>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />
    </Outline>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M20 12H4.5" />
      <path d="M10.5 5.5 4 12l6.5 6.5" />
    </Outline>
  );
}

export function IconLock(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="4.8" y="10.6" width="14.4" height="9.4" rx="2.3" />
      <path d="M8.3 10.6V8.1a3.7 3.7 0 0 1 7.4 0v2.5" />
    </Outline>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m20 6.5-10.2 11L4 11.6" />
    </Outline>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Outline>
  );
}

export function IconSliders(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4 7.5h9M17 7.5h3M4 16.5h3M11 16.5h9" />
      <circle cx="15" cy="7.5" r="2.1" />
      <circle cx="9" cy="16.5" r="2.1" />
    </Outline>
  );
}

export function IconType(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4.5 19 10 5.5h1.6L17 19" />
      <path d="M7.2 14.2h7" />
      <path d="M17.6 9.4H22" />
      <path d="M19.8 9.4V19" />
    </Outline>
  );
}

export function IconFullscreen(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4 9V4.9A.9.9 0 0 1 4.9 4H9M15 4h4.1a.9.9 0 0 1 .9.9V9M20 15v4.1a.9.9 0 0 1-.9.9H15M9 20H4.9a.9.9 0 0 1-.9-.9V15" />
    </Outline>
  );
}

export function IconBook(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 6.6C10.5 5.1 8 4.1 4 4.1v14.2c4 0 6.5 1 8 2.5 1.5-1.5 4-2.5 8-2.5V4.1c-4 0-6.5 1-8 2.5z" />
      <path d="M12 6.6v14.2" />
    </Outline>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M12 2.2c.9 4.9 2.7 6.7 7.6 7.6-4.9.9-6.7 2.7-7.6 7.6-.9-4.9-2.7-6.7-7.6-7.6 4.9-.9 6.7-2.7 7.6-7.6M19 15.6c.4 2.1 1.2 2.9 3.3 3.3-2.1.4-2.9 1.2-3.3 3.3-.4-2.1-1.2-2.9-3.3-3.3 2.1-.4 2.9-1.2 3.3-3.3" />
    </Solid>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 4v10.5" />
      <path d="m7.6 10.4 4.4 4.4 4.4-4.4" />
      <path d="M4.8 17.6v1.6a1.4 1.4 0 0 0 1.4 1.4h11.6a1.4 1.4 0 0 0 1.4-1.4v-1.6" />
    </Outline>
  );
}

export function IconWifiOff(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3 4.5 21 20" />
      <path d="M8.6 12.4A6.6 6.6 0 0 0 6.4 14M15.4 12.4c.7.4 1.4.9 2 1.6M5 9.1a12.8 12.8 0 0 1 4.2-2.2M13.6 6.4A12.9 12.9 0 0 1 19 9.1" />
      <path d="M9.6 15.9a3.4 3.4 0 0 1 4.8 0" />
      <path d="M12 19.4h.01" />
    </Outline>
  );
}

export function IconList(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M8.4 6.5h11.2M8.4 12h11.2M8.4 17.5h11.2" />
      <circle cx="4.6" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="4.6" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="4.6" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
    </Outline>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12.5 3.2c.4 3-1.4 4.6-3.1 6.1-1.6 1.5-2.9 3-2.9 5.4A5.6 5.6 0 0 0 12 20.4a5.6 5.6 0 0 0 5.6-5.7c0-2.5-1.3-4.1-2.4-5.2-.4 1.1-1 1.9-2 2.3.5-2.9-.2-6.2-2.7-8.6z" />
    </Outline>
  );
}

export function IconHeart(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 20.2S3.8 15.4 3.8 9.8a4.4 4.4 0 0 1 8.2-2.2 4.4 4.4 0 0 1 8.2 2.2c0 5.6-8.2 10.4-8.2 10.4z" />
    </Outline>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 5v14M5 12h14" />
    </Outline>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M7.4 4.8a1 1 0 0 1 1.5-.86l10 7.2a1 1 0 0 1 0 1.64l-10 7.2a1 1 0 0 1-1.5-.86z" />
    </Solid>
  );
}
