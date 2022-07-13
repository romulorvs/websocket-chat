export const blockActions = () => {
  let clickableElements: NodeListOf<Element> | undefined;
  const elements = new Map<Element, { ogTabIndex: string | null; ogDisabled: string | null }>();
  let currentContainer: HTMLElement | undefined;

  const preventActions = (container: HTMLElement | string = document.body) => {
    restoreActions();

    if(typeof container === "string"){
      const element = document.querySelector(container)
      if(!element) return;
      currentContainer = element as HTMLElement
    } else {
      currentContainer = container
    }

    clickableElements = currentContainer.querySelectorAll(
      'input, textarea, button, select, a, details, area, frame, iframe, [contentEditable=""], [contentEditable="true"], [contentEditable="TRUE"], [tabindex]:not([tabindex^="-"])'
    );

    clickableElements.forEach((el) => {
      const ogTabIndex = el.getAttribute("tabindex");
      const ogDisabled = el.getAttribute("disabled");
      elements.set(el, { ogTabIndex, ogDisabled });
    });

    clickableElements?.forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.setAttribute("disabled", "disabled");
    });
  };

  const restoreActions = () => {
    try {
      if (clickableElements?.length) {
        clickableElements?.forEach((el) => {
          if (elements.get(el)?.ogTabIndex === null)
            el.removeAttribute("tabindex");
          else el.setAttribute("tabindex", elements.get(el)?.ogTabIndex || "");

          if (elements.get(el)?.ogDisabled === null)
            el.removeAttribute("disabled");
          else el.setAttribute("disabled", elements.get(el)?.ogDisabled || "");
        });

        clickableElements = undefined;
      }
    } catch (error) {
      if (error instanceof DOMException) {
        clickableElements = undefined;
      } else {
        throw error;
      }
    }
  };

  return { preventActions, restoreActions };
};
