interface ClockFaceProps {
  minutes: number;
  seconds: number;
}

const ClockFace = ({ minutes, seconds }: ClockFaceProps) => {
  return (
    <div className="flex justify-self-center">
      <p className="font-medium text-7xl text-wabi-red">
        {minutes} : {seconds < 10 && '0'}
        {seconds}
      </p>
    </div>
  );
};

export default ClockFace;
