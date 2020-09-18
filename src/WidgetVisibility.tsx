interface WidgetVisibility {
  NBA: boolean;
  Soccer: boolean;
  Links: boolean;
}
export type WidgetNames = keyof WidgetVisibility;

type WidgetVisibilityAction = { type: 'toggle'; name: keyof WidgetVisibility };

type WidgetVisibilityReducer = (
  p: WidgetVisibility,
  a: WidgetVisibilityAction
) => WidgetVisibility;

export const widgetVisibilityReducer: WidgetVisibilityReducer = (
  prevState,
  action
) => {
  const newState = { ...prevState };

  switch (action.type) {
    case 'toggle':
      newState[action.name] = !prevState[action.name];
      break;

    default:
      break;
  }

  localStorage.setItem('CNT__WIDGETS_TO_SHOW__v1', JSON.stringify(newState));
  return newState;
};

export const loadWidetsVisibleFromCache = (init: WidgetVisibility) => {
  try {
    const cache = localStorage.getItem('CNT__WIDGETS_TO_SHOW__v1');
    if (!cache) return init;

    const json = JSON.parse(cache);
    if (!json) return init;

    // TODO have type checking for localStorage, could be missing newly added keys
    return { ...init, ...json };
  } catch {
    return init;
  }
};
