/*
fill='none'
stroke='currentColor'
className='w-6 h-6'
{...(rest as any)}
*/
import { FC } from 'react';

type ISVGIcon = React.SVGAttributes<SVGAElement>;

const ItalicIcon: FC<ISVGIcon> = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    className="w-6 h-6"
    {...(rest as any)}
  >
    {/* <path fill="none" d="M0 0h24v24H0z" /> */}
    <path
      fill="currentColor"
      d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"
    />
  </svg>
);

export default ItalicIcon;
