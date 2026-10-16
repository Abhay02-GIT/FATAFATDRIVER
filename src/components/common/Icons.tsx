import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

type Props = {size?: number; color?: string};

function Base({size = 24, color = '#000', children}: Props & {children: React.ReactNode}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      {children}
    </Svg>
  );
}

export function ToolboxIcon(props: Props) {
  return (
    <Base {...props}>
      <Path d="M16 12v4" />
      <Path d="M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z" />
      <Path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <Path d="M2 14h20" />
      <Path d="M8 12v4" />
    </Base>
  );
}

export function ArrowUpCircleIcon(props: Props) {
  return (
    <Base {...props}>
      <Circle cx="12" cy="12" r="10" />
      <Path d="m16 12-4-4-4 4" />
      <Path d="M12 16V8" />
    </Base>
  );
}

export function ClockIcon(props: Props) {
  return (
    <Base {...props}>
      <Circle cx="12" cy="12" r="10" />
      <Path d="M12 6v6l4 2" />
    </Base>
  );
}

export function MapPinIcon(props: Props) {
  return (
    <Base {...props}>
      <Path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <Circle cx="12" cy="10" r="3" />
    </Base>
  );
}

export function ArrowRightIcon(props: Props) {
  return (
    <Base {...props}>
      <Path d="M5 12h14" />
      <Path d="m12 5 7 7-7 7" />
    </Base>
  );
}

export function ArrowLeftIcon(props: Props) {
  return (
    <Base {...props}>
      <Path d="m12 19-7-7 7-7" />
      <Path d="M19 12H5" />
    </Base>
  );
}

export function ChevronDownIcon(props: Props) {
  return (
    <Base {...props}>
      <Path d="m6 9 6 6 6-6" />
    </Base>
  );
}

export function HelpCircleIcon(props: Props) {
  return (
    <Base {...props}>
      <Circle cx="12" cy="12" r="10" />
      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <Path d="M12 17h.01" />
    </Base>
  );
}

export function LockIcon(props: Props) {
  return (
    <Base {...props}>
      <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Base>
  );
}

export function DollarIcon(props: Props) {
  return (
    <Base {...props}>
      <Path d="M12 2v20" />
      <Path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </Base>
  );
}

export function ShieldIcon(props: Props) {
  return (
    <Base {...props}>
      <Path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </Base>
  );
}