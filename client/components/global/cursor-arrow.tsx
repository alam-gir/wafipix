import { FC } from "react";

interface CursoArrowProps extends React.HTMLAttributes<SVGSVGElement> {}

const CursoArrow: FC<CursoArrowProps> = ({ ...props }) => {
  return (
    <svg
      version="1.1"
      width="12"
      height="12"
      viewBox="0 0 256 256"
      className={props.className}
    >
      <defs></defs>
      <g
        className="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 87.85 41.551 L 5.545 1.167 C 2.414 -0.369 -0.979 2.725 0.263 5.984 l 14.342 37.648 c 0.336 0.881 0.336 1.854 0 2.735 L 0.263 84.016 c -1.241 3.259 2.152 6.353 5.282 4.817 L 87.85 48.449 C 90.717 47.043 90.717 42.957 87.85 41.551 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(124,0,232); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

export default CursoArrow;
