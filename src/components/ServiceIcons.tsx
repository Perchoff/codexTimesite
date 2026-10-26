import type { SVGProps } from "react";
import {
  handContour,
  handNails,
  footBody,
  footOutline,
} from "@/data/serviceIconPaths";

type ServiceIconProps = SVGProps<SVGSVGElement> & { size?: number };

export function ManicureIcon({
  size = 40,
  strokeWidth = 1.2,
  ...props
}: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="105 0 320 430"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-icon="manicure"
      {...props}
    >
      <path d={handContour} vectorEffect="non-scaling-stroke" />
      <g strokeWidth=".55">
        {handNails.map((d, index) => (
          <path key={index} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

export function PedicureIcon({
  size = 40,
  strokeWidth = 1.2,
  ...props
}: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-20 -20 1141.126 1740.734"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-icon="pedicure"
      {...props}
    >
      <g transform="translate(165 0) scale(.7 1)">
        <path d={footOutline[0]} vectorEffect="non-scaling-stroke" />
        <g strokeWidth=".55">
          {footBody.slice(0, 5).map((d, index) => (
            <path key={index} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </g>
    </svg>
  );
}
