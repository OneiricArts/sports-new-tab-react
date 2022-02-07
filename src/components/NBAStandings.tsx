import React, { useEffect, useState } from 'react';
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';
import { cx } from './classNames';
import { INbaStandings } from './INbaStandings';
import { ResponsiveComponent } from './ResponsiveComponent';

export type ITeamRecord = {
  name: string;
  rank: string;
  record: string;
  last10: string;
  streak: string;
};

export const Standings = ({ onClose }: { onClose: () => void }) => {
  const [standings, setStandings] = useState<{
    east: Array<ITeamRecord>;
    west: Array<ITeamRecord>;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [east, west] = await fetchStandings();
      setStandings({ east, west });
    };

    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState<'west' | 'east'>('west');

  if (!standings)
    return (
      <Modal isOpen={true} toggle={onClose} size="sm">
        <ModalBody
          style={{
            margin: 'auto',
            padding: '30px'
          }}
        >
          <Spinner />
        </ModalBody>
      </Modal>
    );

  return (
    <Modal isOpen={true} toggle={onClose} size="lg">
      <ModalHeader toggle={onClose}>Standings</ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <ResponsiveComponent
          xs={
            <>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    onClick={() => setActiveTab('west')}
                    className={cx({ active: activeTab === 'west' })}
                  >
                    West
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => setActiveTab('east')}
                    className={cx({ active: activeTab === 'east' })}
                  >
                    East
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="west">
                  <RankTable teams={standings.west} />
                </TabPane>
                <TabPane tabId="east">
                  <RankTable teams={standings.east} />
                </TabPane>
              </TabContent>
            </>
          }
          lg={
            <Row>
              <Col className="pt-2">
                <h4 className="pl-3">West</h4>
                <RankTable teams={standings.west} />
              </Col>
              <Col className="pt-2">
                <h4 className="pl-3">East</h4>
                <RankTable teams={standings.east} />
              </Col>
            </Row>
          }
        />
      </ModalBody>
    </Modal>
  );
};

const RankTable = ({ teams }: { teams: Array<ITeamRecord> }) => (
  <Table size="sm" striped>
    <thead>
      <tr>
        <th>#</th>
        <th>Team</th>
        <th>Record</th>
        <th>L10</th>
        <th>Strk</th>
      </tr>
    </thead>
    <tbody>
      {teams.map((s, i) => (
        <tr
          key={s.name}
          style={{
            // borderBottom: i === 9 ? '3pt solid grey' : undefined,
            backgroundColor: backgroundColor(i + 1)
          }}
          className={cx({
            'text-muted': i > 9
          })}
        >
          <td>{s.rank}</td>
          <td>{s.name}</td>
          <td>{s.record}</td>
          <td>{s.last10}</td>
          <td>{s.streak}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const backgroundColor = (position: number): string | undefined => {
  if ([7, 8, 9, 10].includes(position)) return '#f5f4d0';
  // if (position > 10) return 'gray';
};

const fetchStandings = async () => {
  const data: INbaStandings = await (
    await fetch(
      'https://data.nba.net/10s/prod/v1/current/standings_conference.json'
    )
  ).json();

  return [
    data.league.standard.conference.east,
    data.league.standard.conference.west
  ].map(arr =>
    arr.map(t => ({
      name: t.teamSitesOnly.teamNickname,
      rank: t.confRank,
      record: `${t.win} - ${t.loss}`,
      last10: `${t.lastTenWin} - ${t.lastTenLoss}`,
      streak: `${t.isWinStreak ? '🔥' : '💩'} ${t.streak}`
    }))
  );
};
