import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { removeItem, setItem } from '../common/LocalStorage';
import { useListenToItem } from '../common/LocalStorageHooks';
import { teamCodeInfoEspn } from '../SportsDataAccessors/nba/espnTeamInfo';

const getTeamNames = () =>
  Object.values(teamCodeInfoEspn)
    .map(v => v.nickname)
    .sort();

type TeamName = ReturnType<typeof getTeamNames>[number];

const FAV_TEAM_KEY = 'CNT_NBA_FAV_TEAM';

const setFavTeam = (team: TeamName | ''): void => {
  if (team === '') removeItem(FAV_TEAM_KEY);
  else setItem(FAV_TEAM_KEY, team);
};

export const useNbaFavTeam = () => useListenToItem(FAV_TEAM_KEY);

export const NBAFavTeams = ({ onClose }: { onClose: () => void }) => {
  const favTeam = useListenToItem(FAV_TEAM_KEY);

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
            onChange={e => setFavTeam(e.target.value as TeamName)}
            value={favTeam ?? ''}
          >
            <option value="">-- None --</option>

            {getTeamNames().map(t => (
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
