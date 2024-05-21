import { FC, ReactNode } from 'react';
import tableStyles from './Table.module.scss';
import { cx } from '../classNames';

type TableProps = {
  columnConfig: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

export const Table: FC<TableProps> = ({
  children,
  columnConfig,
  style = {}
}) => {
  return (
    <div
      className={tableStyles.table}
      style={{ gridTemplateColumns: columnConfig, ...style }}
    >
      {children}
    </div>
  );
};

export const Row: FC<{
  children: ReactNode;
  columnSpan: number;

  style?: React.CSSProperties;
  className?: string;
  hover?: boolean;
  cursor?: boolean;

  onClick?: () => void;
  expanded?: boolean;
}> = ({
  children,
  columnSpan,
  onClick,
  expanded,
  style = {},
  className,
  hover = true,
  cursor = true
}) => {
  return (
    <>
      <div
        className={cx({
          [tableStyles.row]: true,
          [tableStyles.rowHover]: hover,
          [tableStyles.rowCursor]: cursor,
          [className ?? '']: !!className
        })}
        style={{ gridColumn: `span ${columnSpan}`, ...style }}
        onClick={onClick}
      >
        {children}
      </div>

      {/* {expanded && (
        <div style={{ gridColumn: 'span 6', padding: '5px' }}>hi</div>
      )} */}
    </>
  );
};
