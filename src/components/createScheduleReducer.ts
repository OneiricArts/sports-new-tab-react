type ActionI<T> = {
  type: 'SET_NEW';
  newState: T;
};

const createScheduleReducer = <StateI>(key: string) => {
  const reducer = (prevState: StateI, action: ActionI<StateI>): StateI => {
    let newState: StateI;

    switch (action.type) {
      case 'SET_NEW':
        newState = { ...action.newState };
        break;

      default:
        newState = { ...prevState };
    }

    localStorage.setItem(key, JSON.stringify(newState));
    return newState;
  };

  return reducer;
};

export default createScheduleReducer;
