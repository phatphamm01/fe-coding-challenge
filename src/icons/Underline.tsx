/*
fill='none'
stroke='currentColor'
className='w-6 h-6'
{...(rest as any)}
*/
import { FC } from 'react';

type ISVGIcon = React.SVGAttributes<SVGAElement>;

const UnderlineIcon: FC<ISVGIcon> = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    className="w-6 h-6"
    {...(rest as any)}
  >
    <path
      fill="currentColor"
      d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"
    />
  </svg>
);

export default UnderlineIcon;
