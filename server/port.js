const MIN_PORT = 20000;
const MAX_PORT = 30000;

const takenPortSet = new Set();

export const getPorts = async () => {
  let port1, port2;

  do {
    port1 = getRandomPort();
    port2 = port1 + 1;
  } while (takenPortSet.has(port1) || takenPortSet.has(port2) || port2 > MAX_PORT);

  takenPortSet.add(port1);
  takenPortSet.add(port2);

  return [port1, port2];
};

export const releasePorts = ([port1, port2]) => {
  takenPortSet.delete(port1);
  takenPortSet.delete(port2);
};

const getRandomPort = () => Math.floor(Math.random() * (MAX_PORT - MIN_PORT + 1) + MIN_PORT);