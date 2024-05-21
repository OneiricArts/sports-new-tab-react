import React, { useEffect, useReducer, useState } from 'react';
import { AddSiteBar } from './AddSiteBar';
import { askFor } from './iFrameHelper';
import { initalSites } from './initalSites';
import { LinkList } from './LinkList';
import { NewCard, NewCardBody, NewCardHeader } from '../UI/Card';
import { TitlePill } from '../UI/TitlePill';
import { Button } from '../UI/Button';

export interface LinkI {
  url: string;
  title: string;
}

interface LinksDataI {
  topSites: LinkI[];
  mySites: LinkI[];
}

type LinksAction =
  | { type: 'addTopSites'; topSites: LinkI[] }
  | { type: 'addMySites'; mysites: LinkI[] } // TODO remove
  | { type: 'removeMySiteByIndex'; index: number }
  | { type: 'addMySite'; site: LinkI };

type LinksReducerI = (prevState: LinksDataI, action: LinksAction) => LinksDataI;

const linksReducer: LinksReducerI = (prevState, action) => {
  let newState: LinksDataI;

  switch (action.type) {
    case 'addTopSites':
      newState = { ...prevState, topSites: action.topSites };
      break;

    case 'addMySites':
      newState = { ...prevState, mySites: action.mysites };
      break;

    case 'removeMySiteByIndex':
      newState = {
        ...prevState,
        mySites: prevState.mySites
          .slice(0, action.index)
          .concat(
            prevState.mySites.slice(action.index + 1, prevState.mySites.length)
          )
      };
      break;

    case 'addMySite':
      newState = { ...prevState, mySites: [...prevState.mySites, action.site] };
      break;

    default:
      return prevState;
  }

  localStorage.setItem(
    'LinksDataI_v1',
    JSON.stringify({ mySites: newState.mySites })
  );

  return newState;
};

const loadLocalStorage = (initData: LinksDataI): LinksDataI => {
  try {
    const data = localStorage.getItem('LinksDataI_v1');
    if (!data) return initData;

    const json = JSON.parse(data);
    if (!json.mySites) return initData;

    return { ...initData, mySites: json.mySites };
  } catch {
    return initData;
  }
};

const Links = () => {
  const [localState, dispatch] = useReducer(
    linksReducer,
    {
      topSites: [],
      mySites: initalSites
    },
    loadLocalStorage
  );

  useEffect(() => {
    const prefillData = () => {
      if (!window.chrome?.topSites || !window.chrome?.storage) return;

      window.chrome?.topSites.get(data => {
        console.log(data);
        dispatch({ type: 'addTopSites', topSites: data.slice(0, 5) });
      });
    };

    prefillData();
  }, []);

  const removeMySiteByIndex = (index: number) => {
    dispatch({ type: 'removeMySiteByIndex', index });
  };

  useEffect(() => {
    const unregisterCbs = [
      askFor<chrome.topSites.MostVisitedURL[]>('chrome.topSites', data =>
        dispatch({
          type: 'addTopSites',
          topSites: data.slice(0, 5)
        })
      )
    ];

    // TODO temp remove
    if (!localStorage.getItem('LinksDataI_v1')) {
      console.log('> REQUESTING chrome.mySitesTransfer');

      askFor<LinksDataI['mySites'] | undefined>(
        'chrome.mySitesTransfer',
        data => {
          if (data)
            dispatch({
              type: 'addMySites',
              mysites: data
            });
        }
      );
    }

    return () => unregisterCbs.forEach(cb => cb?.());
  }, []);

  const addSite = (site: LinkI) => {
    dispatch({
      type: 'addMySite',
      site
    });

    setShowAddSiteBar(false);
  };

  const [showAddSiteBar, setShowAddSiteBar] = useState(false);

  return (
    <NewCard>
      <NewCardHeader style={{ display: 'flex' }}>
        <TitlePill title="My Links" />

        <Button onClick={() => setShowAddSiteBar(e => !e)} className="ml-auto">
          {showAddSiteBar ? 'Done' : 'Add Link'}
        </Button>
      </NewCardHeader>

      {showAddSiteBar && <AddSiteBar addSite={addSite} />}

      <NewCardBody>
        <LinkList list={localState.mySites} onRemove={removeMySiteByIndex} />
      </NewCardBody>

      {/* {{localState.topSites.length > 0 && <Divider />} */}
      {localState.topSites.length > 0 && (
        <>
          <NewCardHeader>
            <TitlePill title="Chrome Top Sites" />
          </NewCardHeader>
          <NewCardBody>
            <LinkList list={localState.topSites} />
          </NewCardBody>
        </>
      )}
    </NewCard>
  );
};

export default Links;
