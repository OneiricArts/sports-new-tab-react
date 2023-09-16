import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { removeItem, setItem } from '../common/LocalStorage';
import { useListenToItem } from '../common/LocalStorageHooks';
import { teamCodeInfoEspn } from '../SportsDataAccessors/nba/espnTeamInfo';

export const useFavTeam = (sport: 'nfl' | 'mlb' | 'nba' | undefined) => {
  let key: string | undefined = undefined;
  if (sport === 'nba') key = NBA_FAV_TEAM_KEY;

  return useListenToItem(key);
};

const NBA_FAV_TEAM_KEY = 'CNT_NBA_FAV_TEAM';
export const NBAFavTeams = ({ onClose }: { onClose: () => void }) => {
  const getTeamNames = () =>
    Object.values(teamCodeInfoEspn)
      .map(v => v.nickname)
      .sort();

  return (
    <FavTeam
      onClose={onClose}
      teams={getTeamNames()}
      TEAM_KEY={NBA_FAV_TEAM_KEY}
    />
  );
};

type FavTeamProps<T extends string> = {
  onClose: () => void;
  teams: T[];
  TEAM_KEY: string;
};

export const FavTeam = <T extends string>({
  onClose,
  teams,
  TEAM_KEY
}: FavTeamProps<T>) => {
  const favTeam = useListenToItem(TEAM_KEY);

  const setFavTeam = (team: T | ''): void => {
    if (team === '') removeItem(TEAM_KEY);
    else setItem(TEAM_KEY, team);
  };

  return (
    <Modal isOpen={true} toggle={onClose} size="md">
      <ModalHeader toggle={onClose}>Favorite Team</ModalHeader>
      <ModalBody>
        <p>
          Select your favorite team, it will be highlighted in the schedule and
          standings.
        </p>

        <hr />

        <div>
          <label htmlFor="fav-team-select">Favorite team</label>
        </div>

        <div>
          <select
            name="pets"
            id="fav-team-select"
            onChange={e => setFavTeam(e.target.value as T)}
            value={favTeam ?? ''}
          >
            <option value="">-- None --</option>

            {teams.map(t => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </ModalBody>
    </Modal>
  );
};
