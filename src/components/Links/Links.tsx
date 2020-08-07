import React, { useEffect, useReducer, useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { AddSiteBar } from './AddSiteBar';
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
  | { type: 'removeMySiteByIndex'; index: number }
  | { type: 'addMySite'; site: LinkI };

type LinksReducerI = (prevState: LinksDataI, action: LinksAction) => LinksDataI;

const linksReducer: LinksReducerI = (prevState, action) => {
  let newState: LinksDataI;

  switch (action.type) {
    case 'addTopSites':
      newState = { ...prevState, topSites: action.topSites };
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
      if (!chrome.topSites || !chrome.storage) return;

      chrome.topSites.get(data => {
        console.log(data);
        dispatch({ type: 'addTopSites', topSites: data });
      });

      // TODO remove after a couple versions
      try {
        chrome.storage.local.get('Links_data', data => {
          if (!data?.Link_data?.myLinks) return;

          dispatch({ type: 'addTopSites', topSites: data.Links_data.myLinks });

          chrome.storage.local.remove('Links_data');
        });
      } catch {}
    };

    prefillData();
  }, []);

  const removeMySiteByIndex = (index: number) => {
    dispatch({ type: 'removeMySiteByIndex', index });
  };

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

      {chrome.topSites && (
        <CardHeader className="border-top">Chrome Top Sites</CardHeader>
      )}

      <CardBody>
        <LinkList list={localState.topSites} />
      </CardBody>
    </Card>
  );
};

export default Links;
