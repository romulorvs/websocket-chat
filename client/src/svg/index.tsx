export const SVGSend = (
  <svg viewBox="0 0 28 28">
    <path d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z" />
  </svg>
);

export const SVGAnimatedQuote = (
  <svg viewBox="0 0 100 100">
    <path
      d="M50 15C29.0537 15 12 21.4676 12 46.3217C12 56.6699 14.9659 63.8766 19.9707 68.6811C19.9707 72.6509 19.125 78 19.125 78C19.125 78 24.4688 76.217 30.3512 74.8716C36.0976 76.9042 42.7707 77.6434 50 77.6434C70.9463 77.6434 88 71.1758 88 46.3217C88 21.4676 70.9463 15 50 15Z"
      fill="#dbdbdb"
    />
    <circle cx="30" cy="47" r="5" fill="#a5a5a5">
      <animate
        attributeName="opacity"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;0.2;1"
        values="0;1;1"
      />
    </circle>
    <circle cx="50" cy="47" r="5" fill="#a5a5a5">
      <animate
        attributeName="opacity"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;0.2;0.4;1"
        values="0;0;1;1"
      />
    </circle>
    <circle cx="70" cy="47" r="5" fill="#a5a5a5">
      <animate
        attributeName="opacity"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;0.4;0.6;1"
        values="0;0;1;1"
      />
    </circle>
  </svg>
);

export const SVGSpinner = (
  <svg viewBox="0 0 100 100">
    <circle
      cx="50"
      cy="50"
      r="30"
      stroke="rgba(255, 255, 255, 0.25)"
      strokeWidth="12"
      fill="none"
    />
    <circle
      cx="50"
      cy="50"
      r="30"
      stroke="#000000"
      strokeWidth="12"
      strokeLinecap="round"
      fill="none"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;180 50 50;720 50 50"
        keyTimes="0;0.5;1"
      />
      <animate
        attributeName="stroke-dasharray"
        repeatCount="indefinite"
        dur="1s"
        values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882"
        keyTimes="0;0.5;1"
      />
    </circle>
  </svg>
);
