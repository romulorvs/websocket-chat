type CustomElement = Element & {
  ogTabIndex: string | null;
  ogDisabled: string | null;
};

type PreventActionsParams = {
  container?: HTMLElement;
  zIndex?: number;
};

export const blockActions = () => {
  let clickableElements: NodeListOf<CustomElement> | undefined;

  const elements = new Map<CustomElement, { ogTabIndex: string | null; ogDisabled: string | null; }>();

  const coverElement = document.createElement("div");
  coverElement.style.position = "fixed";
  coverElement.style.top = "0";
  coverElement.style.left = "0";
  coverElement.style.bottom = "0";
  coverElement.style.right = "0";

  let currentContainer: HTMLElement | undefined;

  const preventActions = ({ container = document.body, zIndex }: PreventActionsParams = {}) => {
    restoreActions();
    currentContainer = container;

    if (typeof zIndex === "undefined") coverElement.style.zIndex = `${zIndex}`;

    clickableElements = currentContainer.querySelectorAll("input, textarea, button, select, a");

    clickableElements.forEach((el) => {
      const ogTabIndex = el.getAttribute("tabindex");
      const ogDisabled = el.getAttribute("disabled");
      elements.set(el, { ogTabIndex, ogDisabled });
    });

    clickableElements?.forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.setAttribute("disabled", "disabled");
    });

    const activeElement = document.activeElement as typeof document.activeElement & { blur: Function };

    if (activeElement) {
      clickableElements?.forEach((el) => {
        if (el === (activeElement as Element)) {
          activeElement.blur();
        }
      });
    }

    currentContainer.appendChild(coverElement);
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

        currentContainer?.removeChild(coverElement);
      }
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error;
      }
    } finally {
      clickableElements = undefined;
    }
  };

  return { preventActions, restoreActions };
};
