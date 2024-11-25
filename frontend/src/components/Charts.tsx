import FocusTime from './FocusTime';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TaskCompletionChart from './TaskCompletionChart';

const Charts = () => {
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <h1 className="text-3xl text-wabi-red font-bold mb-6">Charts</h1>

      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="rounded-md border w-3/4 mx-auto bg-white border-wabi-btn-primary-unselected p-4">
              <FocusTime />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="rounded-md border w-3/4 mx-auto bg-white border-wabi-btn-primary-unselected p-4">
              <TaskCompletionChart />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Charts;
