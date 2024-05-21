import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { displayGameStatus } from '../SportsDataAccessors/helpers';
import { Game, NFLGame } from '../SportsDataAccessors/types';
import { useFavTeam } from './FavTeams';
import { BroadcastIcon } from '../icons/BroadcastIcon';
import { Loader } from './Loader';
import { Row, Table } from './UI/Table';

type GameI = Game | NFLGame;
const gray = `#888888`;

const FootballEmoji = () => (
  <span
    role="img"
    aria-label="has posession"
    className="d-none d-md-inline d-lg-inline"
  >
    &nbsp;🏈
  </span>
);

const GameRow = ({
  game,
  removeGame,
  sport
}: {
  game: GameI;
  removeGame?: (id: number | string) => void;
  sport?: 'nfl' | 'mlb' | 'nba';
}) => {
  const handleClick = () => removeGame?.(game.id);

  const homeTeamHasPosession =
    'homeTeamHasPosession' in game ? game.homeTeamHasPosession : undefined;
  const awayTeamHasPosession =
    'homeTeamHasPosession' in game ? game.awayTeamHasPosession : undefined;

  // const [showExpandedContent, setShowExpandedContent] = useState(false);

  const favTeam = useFavTeam(sport);
  const isFavTeam = [game.homeTeam, game.awayTeam].includes(favTeam ?? '');

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    setHighlight(true);

    const tm = setTimeout(() => {
      setHighlight(() => false);
    }, 2000);

    return () => clearTimeout(tm);
  }, [
    game.homeTeamScore,
    game.awayTeamScore,
    homeTeamHasPosession,
    awayTeamHasPosession
  ]);

  const [highlight, setHighlight] = useState(false);

  const rowStyle: React.CSSProperties = {};
  const rand = () => false && Math.random() > 0.8;

  if (highlight || rand())
    rowStyle.backgroundColor = 'rgb(89, 89, 12)'; //'#6a6a17';
  else if (isFavTeam)
    rowStyle.backgroundColor = 'rgb(0 78 0 / 57%)'; //'#045b04';
  else if ((game as NFLGame).redzone || rand())
    rowStyle.backgroundColor = '#6b0909';

  return (
    <Row
      columnSpan={removeGame ? 6 : 5}
      style={rowStyle}
      // onClick={() => {
      //   if (game.expandedContent) {
      //     setShowExpandedContent(e => !e);
      //   }
      // }}
    >
      <div className="align-middle">
        <div>{displayGameStatus(game.status)}</div>

        {game.isOnNationalTv && (
          <span
            className="px-0"
            style={{
              fontSize: '12px',
              display: 'flex',
              color: gray,
              maxHeight: '15px',
              alignItems: 'center',
              gap: '3px'
            }}
          >
            <BroadcastIcon style={{ height: '15px', color: gray }} />{' '}
            {game.broadcaster}
          </span>
        )}
      </div>

      <div
        className={`align-middle ${
          game.awayTeamWinning ? 'winning_team' : ''
        } ${(game as NFLGame).awayTeamHasPosession ? 'has_posession' : ''}`}
      >
        {game.awayTeamDisplay?.() ?? game.awayTeam}
        {(game as NFLGame).awayTeamHasPosession && <FootballEmoji />}
      </div>

      <div
        className={`align-middle ${
          game.homeTeamWinning ? 'winning_team' : ''
        } ${(game as NFLGame).homeTeamHasPosession ? 'has_posession' : ''}`}
      >
        {game.homeTeamDisplay?.() ?? game.homeTeam}
        {(game as NFLGame).homeTeamHasPosession && <FootballEmoji />}
      </div>

      <div className="align-middle text-right">{game.awayTeamScore}</div>
      <div className="align-middle text-right">{game.homeTeamScore}</div>

      {removeGame && (
        <div className="align-middle text-right">
          <Button
            outline={true}
            color="secondary"
            size="sm"
            onClick={handleClick}
          >
            &#9587;
          </Button>
        </div>
      )}

      {/* {game.expandedContent && (
        <ExpandedContent
          expandedContent={game.expandedContent}
          isOpen={showExpandedContent}
        />
      )} */}
    </Row>
  );
};

// const ExpandedContent = ({
//   expandedContent,
//   isOpen
// }: {
//   expandedContent: () => ReactNode;
//   isOpen: boolean;
// }) => {
//   return (
//     <tr>
//       <td colSpan={6} style={{ padding: 0 }}>
//         <Collapse isOpen={isOpen}>{expandedContent()}</Collapse>
//       </td>
//     </tr>
//   );
// };

export const ExpandedContentWrapper: FC<{ children?: ReactNode }> = ({
  children
}) => (
  <div className="text-muted small font-weight-light px-2 py-2 w-100">
    {children}
  </div>
);

const s = { display: 'flex', alignItems: 'end', height: '100%' };

const TableHeader = ({
  resetSchedule,
  isLoading
}: {
  resetSchedule?: () => void;
  isLoading: boolean;
}) => (
  <Row
    columnSpan={resetSchedule ? 6 : 5}
    style={{ fontSize: '12px', verticalAlign: 'bottom' }}
    hover={false}
    cursor={false}
  >
    <div /* status */>
      <Loader
        isLoading={isLoading}
        minimum={1200}
        spinner={<Spinner size="sm" color="primary" type="grow" />}
      />
    </div>
    <div style={s}>away</div>
    <div style={s}>@home</div>
    <div style={{ ...s, justifyContent: 'end' }}>a</div>
    <div style={{ ...s, justifyContent: 'end' }}>h</div>
    {resetSchedule && (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          outline={true}
          color="secondary"
          size="sm"
          onClick={() => resetSchedule()}
          style={{
            width: '28.25px'
          }}
        >
          <Loader
            isLoading={isLoading}
            minimum={1200}
            spinner={<Spinner size="sm" color="primary" type="grow" />}
          >
            <span>&#x21ba;</span>
          </Loader>
        </Button>
      </div>
    )}
  </Row>
);

const GameTable = ({
  games,
  removeGame,
  resetSchedule,
  isLoading = false,
  sport
}: {
  games: GameI[];
  removeGame?: (id: number | string) => void;
  isLoading?: boolean;
  resetSchedule?: () => void;
  sport?: 'nfl' | 'mlb' | 'nba';
}) => {
  return (
    // {isLoading && (
    //   <Progress animated style={{ height: '5px' }} color="info" value={100} />
    // )}

    <Table
      columnConfig={`${sport === 'nfl' ? 3 : 2}fr 2fr 2fr 1fr 1fr ${
        resetSchedule ? '1fr' : ''
      }`}
      style={{
        columnGap: '10px',
        // currently the reset button takes a lot of space, remove padding in that case
        paddingTop: resetSchedule ? '0' : undefined
      }}
    >
      <TableHeader resetSchedule={resetSchedule} isLoading={isLoading} />
      {games
        .filter(game => !game.hidden)
        .map(game => (
          <GameRow
            key={game.id}
            game={game}
            removeGame={removeGame}
            sport={sport}
          />
        ))}
    </Table>
  );
};

export default GameTable;
