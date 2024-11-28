import FocusTime from './FocusTime';

const Charts = () => {
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <h1 className="text-3xl text-wabi-red font-bold mb-6">Charts</h1>
      <div className="rounded-md border w-3/4 mx-auto bg-white border-wabi-btn-primary-unselected p-4">
        <FocusTime />
      </div>
    </div>
  );
};

export default Charts;
