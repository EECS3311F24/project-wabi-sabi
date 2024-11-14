import { Button } from '@/components/ui/button';
import { useCountdown } from './hooks';
import ClockFace from './ClockFace';
import { useEffect, useState } from 'react';
import playIcon from '../assets/play.svg';
import resetIcon from '../assets/reset-2.svg';
import skipIcon from '../assets/skip.svg';
import pauseIcon from '../assets/pause.svg';
import SelectedButton from '@/components/ui/SelectedButton';
import TagDropdown from '@/components/SelectTag';
const TimerDashboard = () => {
  const { isActive, toggleTimer, resetTimer, setTimer, minutes, seconds } = useCountdown({
    initialMinutes: 25,
    initialSeconds: 0,
  });
  const [timerState, setTimerState] = useState<keyof typeof timerModes>('pomodoro');
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [breaksCount, setBreaksCount] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const MAX_SHORT_BREAKS = 4;

  useEffect(() => {
    if (minutes == 0 && seconds == 0 && timerState == 'pomodoro' && breaksCount <= MAX_SHORT_BREAKS) {
      setSessionCount(sessionCount + 1);
      setTimerState('shortBreak');
      setBreaksCount(breaksCount + 1);
      shortBreakClickHandler();
    }
    if (minutes == 0 && seconds == 0 && timerState == 'pomodoro' && breaksCount > MAX_SHORT_BREAKS) {
      setSessionCount(sessionCount + 1);
      setTimerState('longBreak');
      setBreaksCount(breaksCount + 1);
      longBreakClickHandler();
    }
    if (minutes == 0 && seconds == 0 && timerState != 'pomodoro') {
      setTimerState('pomodoro');
      pomodoroClickHandler();
    }
  }, [minutes, seconds, breaksCount]);

  console.log('>> session count | timer state', { sessionCount }, { timerState });

  const pomodoroClickHandler = () => {
    resetTimer();
    setTimer({
      initialMinutes: 25,
      initialSeconds: 0,
    });
    setTimerState('pomodoro');
  };

  const shortBreakClickHandler = () => {
    resetTimer();
    setTimer({
      initialMinutes: 5,
      initialSeconds: 0,
    });
    setTimerState('shortBreak');
  };

  const longBreakClickHandler = () => {
    resetTimer();
    setTimer({
      initialMinutes: 15,
      initialSeconds: 0,
    });
    setTimerState('longBreak');
  };

  // mapping strings to functions
  const timerModes = {
    pomodoro: pomodoroClickHandler,
    shortBreak: shortBreakClickHandler,
    longBreak: longBreakClickHandler,
  };

  const handleModeChange = (mode: keyof typeof timerModes) => {
    console.log('handleModeChange called with mode:', mode); // debugging
    timerModes[mode]();
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    console.log('Selected Tag', value);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="pt-40">
          <p className="font-bold justify-self-center text-wabi-red">#{sessionCount}</p>
          <ClockFace minutes={minutes} seconds={seconds} />
        </div>

        <div className="flex flex-row space-x-6 pt-[136px]">
          <Button
            className="bg-white border-wabi-btn-primary-unselected border-2 hover:bg-gray-100 rounded-full w-[58px] h-[56px] mt-[6px]"
            onClick={() => handleModeChange(timerState)}
          >
            <img src={resetIcon} alt="Reset" className="size-8" />
          </Button>
          {!isActive && (
            <Button
              className="rounded-full w-[67px] h-[65px] bg-wabi-btn-primary-unselected hover:bg-wabi-btn-hover-primary-unselected"
              onClick={toggleTimer}
            >
              <img src={playIcon} alt="Play" className="fill-white ml-1 w-6 h-6" />
            </Button>
          )}
          {isActive && (
            <Button
              className="rounded-full w-[67px] h-[65px] bg-wabi-btn-primary-unselected hover:bg-wabi-btn-hover-primary-unselected"
              onClick={toggleTimer}
            >
              <img src={pauseIcon} alt="Pause" className="fill-white size-6" />
            </Button>
          )}
          {/* <Button
            className="bg-white border-wabi-btn-primary-unselected border-2 hover:bg-gray-100 w-[58px] h-[56px] rounded-full mt-[6px]"
            onClick={() => handleModeChange(timerState)}
          >
            <img src={skipIcon} alt="Skip" className="size-5" />
          </Button> */}
        </div>
        <div className="flex flex-row space-x-6 pt-[30px]">
          {timerState == 'pomodoro' && (
            <SelectedButton
              className="p-3.5"
              content={'Pomodoro'}
              onClick={() => handleModeChange('pomodoro')}
            ></SelectedButton>
          )}
          {timerState != 'pomodoro' && (
            <Button
              className="bg-wabi-btn-primary-unselected hover:bg-wabi-btn-hover-primary-unselected"
              onClick={() => handleModeChange('pomodoro')}
            >
              Pomodoro
            </Button>
          )}
          {timerState == 'shortBreak' && (
            <SelectedButton
              className="p-3.5"
              content={'Short Break'}
              onClick={() => handleModeChange('pomodoro')}
            ></SelectedButton>
          )}
          {timerState != 'shortBreak' && (
            <Button
              className="bg-wabi-btn-primary-unselected hover:bg-wabi-btn-hover-primary-unselected"
              onClick={() => handleModeChange('shortBreak')}
            >
              Short Break
            </Button>
          )}
          {timerState == 'longBreak' && (
            <SelectedButton
              className="p-3.5"
              content={'Long Break'}
              onClick={() => handleModeChange('pomodoro')}
            ></SelectedButton>
          )}
          {timerState != 'longBreak' && (
            <Button
              className="bg-wabi-btn-primary-unselected hover:bg-wabi-btn-hover-primary-unselected"
              onClick={() => handleModeChange('longBreak')}
            >
              Long Break
            </Button>
          )}
        </div>
        <div className="flex flex-row space-x-6 pt-[30px] font-bold text-xl text-wabi-red">Tag</div>
        <div className="flex flex-row space-x-6 pt-[30px]">
          <TagDropdown className="w-48 " onSelectChange={handleTagChange} isDisabled={isActive} />
        </div>
      </div>
    </>
  );
};

export default TimerDashboard;
