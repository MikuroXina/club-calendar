import { FC, useState, useRef } from 'react';
import { Meeting } from '../../../lib';
import MeetingDetails from './meeting-details';

type DayCellProps = {
  pos: number;
  day: number;
  meeting?: Meeting;
};

export const DayCell: FC<DayCellProps> = ({ pos, day, meeting }) => {
  const x = (pos % 7) + 1;
  const color = x === 7 ? 'darkblue' : x === 1 ? 'darkred' : 'black';
  const [showingDetails, setShowingDetails] = useState(false);
  const ref = useRef(null);
  return (
    <>
      <div
        ref={ref}
        onClick={e => {
          if (meeting == null || ref.current != e.target) return;
          setShowingDetails(!showingDetails);
        }}
      >
        {day}
        {showingDetails && meeting != null ? (
          <MeetingDetails meeting={meeting} />
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        div {
          display: inline-grid;
          text-align: center;
          box-shadow: 1px 1px 2px darkgray;
          margin: 0;
          width: 100%;
          height: 2em;
          grid-column: ${x};
          grid-row: ${Math.ceil((pos + 1) / 7)};
          color: ${color};
          cursor: pointer;
          ${meeting == null
            ? ''
            : `
          background-color: darkcyan;
          color: white;
          `}
        }
      `}</style>
    </>
  );
};
