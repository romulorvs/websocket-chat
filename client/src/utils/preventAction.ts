export const blockActions = () => {
  let focusedElement: Element | null = null;
  let focusedElementOnBlur: Element | null = null;
  let currentContainer: HTMLElement | Element | undefined;
  let clickableElements: NodeListOf<HTMLElement> | undefined;
  const elements = new Map<Element, {
    ogTabIndex: string | null;
    ogDisabled: string | null;
    ogPointerEvents: string;
  }>();

  const preventActions = (container: HTMLElement | Element | string = document.body) => {
    restoreActions();

    if (typeof container === "string") {
      const element = document.querySelector(container);
      if (!element) return;
      currentContainer = element as HTMLElement;
    } else {
      currentContainer = container;
    }

    const { activeElement } = document;

    clickableElements = currentContainer.querySelectorAll(
      'input, textarea, button, select, a, details, area, frame, iframe, [contentEditable=""], [contentEditable="true"], [contentEditable="TRUE"], [tabindex]:not([tabindex^="-"])'
    );

    for (let i = 0; i < clickableElements.length; i++) {
      const el = clickableElements[i];

      if (activeElement === el) {
        focusedElement = activeElement;
        (focusedElement as HTMLElement).blur();
        focusedElementOnBlur = document.activeElement;
      }

      const ogTabIndex = el.getAttribute("tabindex");
      const ogDisabled = el.getAttribute("disabled");
      const ogPointerEvents = el.style.pointerEvents;
      elements.set(el, { ogTabIndex, ogDisabled, ogPointerEvents });
      el.setAttribute("tabindex", "-1");
      el.setAttribute("disabled", "disabled");
      el.style.pointerEvents = "none";
    }
  };

  const restoreActions = () => {
    try {
      if (clickableElements?.length) {
        for (let i = 0; i < clickableElements.length; i++) {
          const el = clickableElements[i];
          const storedEl = elements.get(el);

          if (storedEl) {
            if (storedEl.ogTabIndex === null) {
              el.removeAttribute("tabindex");
            } else {
              el.setAttribute("tabindex", storedEl.ogTabIndex || "");
            }

            if (storedEl.ogDisabled === null) {
              el.removeAttribute("disabled");
            } else {
              el.setAttribute("disabled", storedEl.ogDisabled || "");
            }

            el.style.pointerEvents = storedEl.ogPointerEvents;
          }
        }

        if (focusedElement && focusedElementOnBlur === document.activeElement) {
          (focusedElement as HTMLElement).focus();
        }
      }

      focusedElement = null;
      focusedElementOnBlur = null;
      clickableElements = undefined;
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
