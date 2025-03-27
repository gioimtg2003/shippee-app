export const isInStandaloneMode = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  document.referrer.includes('android-app://');

export const getLocation = (
  onInit: () => void,
  onSuccess: (position: GeolocationPosition) => void,
  onFail: (positionError: GeolocationPositionError) => void,
  onTimeOut: () => void
) => {
  if (navigator.geolocation) {
    onInit();
    navigator.geolocation.getCurrentPosition(onSuccess, onFail);

    setTimeout(() => {
      onTimeOut();
    }, 500);
  } else {
    alert("This device doesn't support location!");
  }
};
