export const createNewTransport = async (mediasoupRouter) => {
  const transport = await mediasoupRouter.createWebRtcTransport({
    listenIps: [
      {
        ip: "0.0.0.0",
        announcedIp: "36.50.13.22",
      },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    enableSctp: true,
    initialAvailableOutgoingBitrate: 1000000,
  });

  try {
    transport.setMaxIncomingBitrate(3500000);
  } catch (err) {
    console.error(err);
  }

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
      sctpParameters: transport.sctpParameters,
    },
  };
};
