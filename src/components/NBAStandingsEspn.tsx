import { useState } from 'react';
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';
import { EspnNbaStandings } from '../SportsDataAccessors/nba/espnRankings';
import { cx } from './classNames';
import { useNbaFavTeam } from './NBAFavTeams';
import { ResponsiveComponent } from './ResponsiveComponent';

export type ITeamRecord = {
  name: string;
  rank: number;
  record: string;
  streak: string;
};

const getStreakStr = (strk: number, win: boolean): string => {
  const emoj = win ? '🔥' : '💩';
  const letter = win ? 'W' : 'L';
  // const [emoj, letter] = win ? ['🔥', 'W'] : ['💩', 'L'];

  if (strk >= 4) return `${emoj}${strk}`;
  return `${letter}${strk}`;
};

export const StandingsEspn = ({
  onClose,
  standings
}: {
  onClose: () => void;
  standings: EspnNbaStandings;
}) => {
  const [activeTab, setActiveTab] = useState<'west' | 'east'>('west');

  const [east, west] = [standings.east, standings.west].map(arr =>
    arr.map(t => ({
      name: t.name,
      rank: t.confRank,
      record: `${t.wins} - ${t.losses}`,
      streak: getStreakStr(t.streak, t.isWinStreak)
    }))
  );

  const arrs = [
    ['West', 'west', west],
    ['East', 'east', east]
  ] as const;

  return (
    <Modal isOpen={true} toggle={onClose} size="lg">
      <ModalHeader toggle={onClose}>Standings</ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <ResponsiveComponent
          xs={
            <>
              <Nav tabs>
                {arrs.map(([title, id, arr]) => (
                  <NavItem key={id}>
                    <NavLink
                      onClick={() => setActiveTab(id)}
                      className={cx({ active: activeTab === id })}
                    >
                      {title}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>

              <TabContent activeTab={activeTab}>
                {arrs.map(([_, id, arr]) => (
                  <TabPane tabId={id} key={id}>
                    <RankTable teams={arr} />
                  </TabPane>
                ))}
              </TabContent>
            </>
          }
          lg={
            <Row>
              {arrs.map(([title, _, arr]) => (
                <Col className="pt-2" key={title}>
                  <h4 className="pl-3">{title}</h4>
                  <RankTable teams={arr} />
                </Col>
              ))}
            </Row>
          }
        />
      </ModalBody>
    </Modal>
  );
};

const RankTable = ({ teams }: { teams: Array<ITeamRecord> }) => {
  const favTeam = useNbaFavTeam();

  return (
    <Table size="sm" striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Record</th>
          <th>Strk</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((s, i) => (
          <tr
            key={s.name}
            style={{
              // borderBottom: i === 9 ? '3pt solid grey' : undefined,
              backgroundColor:
                favTeam === s.name ? undefined : backgroundColor(i + 1)
            }}
            className={cx({
              'text-muted': i > 9,
              'table-success': favTeam === s.name
            })}
          >
            <td>{s.rank}</td>
            <td>{s.name}</td>
            <td>{s.record}</td>
            <td>{s.streak}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const backgroundColor = (position: number): string | undefined => {
  if ([7, 8, 9, 10].includes(position)) return '#f5f4d0';
  // if (position > 10) return 'gray';
};
