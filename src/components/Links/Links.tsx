import React, { useEffect, useReducer, useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { AddSiteBar } from './AddSiteBar';
import { askFor } from './iFrameHelper';
import { initalSites } from './initalSites';
import { LinkList } from './LinkList';

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
    const unregister = askFor<chrome.topSites.MostVisitedURL[]>(
      'chrome.topSites',
      data =>
        dispatch({
          type: 'addTopSites',
          topSites: data.slice(0, 5)
        })
    );

    return () => unregister?.();
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
    <Card>
      <CardHeader className="d-flex">
        My Sites
        <Button
          color="primary"
          outline
          size="sm"
          onClick={() => setShowAddSiteBar(e => !e)}
          className="ml-auto"
        >
          {showAddSiteBar ? 'Done' : 'Add Link'}
        </Button>
      </CardHeader>

      {showAddSiteBar && <AddSiteBar addSite={addSite} />}

      <CardBody>
        <LinkList list={localState.mySites} onRemove={removeMySiteByIndex} />
      </CardBody>

      {localState.topSites.length > 0 && (
        <CardHeader className="border-top">Chrome Top Sites</CardHeader>
      )}

      <CardBody>
        <LinkList list={localState.topSites} />
      </CardBody>
    </Card>
  );
};

export default Links;
