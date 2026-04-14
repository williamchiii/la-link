import WavesCode from "../reactbits/WavesCode.jsx";

const WavesBg = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <WavesCode
        lineColor="#5227FF"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
    </div>
  );
};

export default WavesBg;
