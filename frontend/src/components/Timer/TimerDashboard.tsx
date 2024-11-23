import { Button } from '@/components/ui/button';
import { useCountdown } from './hooks';
import ClockFace from './ClockFace';
import { useCallback, useEffect, useState } from 'react';
import playIcon from '../../assets/play.svg';
import resetIcon from '../../assets/reset-2.svg';
import skipIcon from '../../assets/skip.svg';
import pauseIcon from '../../assets/pause.svg';
import settingIcon from '../../assets/settings.svg';
import SelectedButton from '@/components/ui/SelectedButton';
import { useAuth } from '@/components/AuthProviderUtils';
import { addStudySession, sendCachedData, useSaveDataOnReload } from './utils';
import { useOutletContext } from 'react-router-dom';
import TagDropdown from '../SelectTag';
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog';
import UnselectedButton from '../ui/UnselectedButton';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
type DashboardContextType = {
  registerSaveHandler: (handler: () => void) => void;
};

const TimerDashboard = () => {
  const { registerSaveHandler } = useOutletContext<DashboardContextType>(); // gets the register save handler from dashboard container

  const { isActive, toggleTimer, resetTimer, setTimer, minutes, seconds } = useCountdown({
    initialMinutes: 25,
    initialSeconds: 0,
  }); // contains actual countdown timer

  const { authToken } = useAuth(); // user authentication token

  const [timerState, setTimerState] = useState<keyof typeof timerModes>('pomodoro'); // current timer mode
  const [sessionCount, setSessionCount] = useState<number>(1); // number of pomodoro sessions run
  const [breaksCount, setBreaksCount] = useState<number>(0); // number of short breaks used
  const [timeLastStarted, setTimeLastStarted] = useState<Date>(new Date()); // last time timer was started
  const MAX_SHORT_BREAKS = 3; // maximum number of short breaks allowed
  const [selectedTag, setSelectedTag] = useState<string>('');

  // tracks the duration of the three timermodes
  const [durations, setDurations] = useState({
    pomodoro: { minutes: minutes, seconds: seconds }, // displays default duration
    shortBreak: { minutes: 5, seconds: 0 },
    longBreak: { minutes: 10, seconds: 0 },
  });

  const [open, setOpen] = useState(false); // State to control dialog visibility

  // saves last study session to cache when user reloads
  useSaveDataOnReload({ timeLastStarted, isActive, tagID: selectedTag });

  // save handler for saving last study session data to cache;
  // passed into registerSaveHandler so the DashboardContainer
  // can use this function whenever the user navigates outside of /timer page
  const saveDataToCache = useCallback(() => {
    if (isActive) {
      localStorage.setItem('unsavedStart', timeLastStarted.toISOString());
      localStorage.setItem('unsavedEnd', new Date().toISOString());
      // Save durations data (serialize to a string)
      localStorage.setItem('durations', JSON.stringify(durations));
      console.log('Timer data saved to local storage');
    }
  }, [isActive, timeLastStarted, durations]);

  // register the save handler with the parent
  useEffect(() => {
    registerSaveHandler(saveDataToCache);
  }, [registerSaveHandler, isActive, timeLastStarted, durations, saveDataToCache]);

  // -- functions called when user selects timer type buttons
  const pomodoroClickHandler = useCallback(() => {
    resetTimer();
    setTimer({
      initialMinutes: durations.pomodoro.minutes,
      initialSeconds: durations.pomodoro.seconds,
    });
    setTimerState('pomodoro');
  }, [resetTimer, setTimer]);

  const shortBreakClickHandler: () => void = useCallback(() => {
    if (isActive && timerState === 'pomodoro')
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
    resetTimer();
    setTimer({
      initialMinutes: durations.shortBreak.minutes,
      initialSeconds: durations.shortBreak.seconds,
    });
    setTimerState('shortBreak');
  }, [authToken, isActive, resetTimer, selectedTag, setTimer, timeLastStarted, timerState]);

  const longBreakClickHandler: () => void = useCallback(() => {
    if (isActive && timerState === 'pomodoro')
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
    resetTimer();
    setTimer({
      initialMinutes: durations.longBreak.minutes,
      initialSeconds: durations.longBreak.seconds,
    });
    setTimerState('longBreak');
  }, [authToken, isActive, resetTimer, selectedTag, setTimer, timeLastStarted, timerState]);

  // mapping strings to functions
  const timerModes = {
    pomodoro: pomodoroClickHandler,
    shortBreak: shortBreakClickHandler,
    longBreak: longBreakClickHandler,
  };

  // useEffect runs in the background and checks for changes in the variables contained within the dependency array at the bottom.
  // handles timer flow when time has expired
  useEffect(() => {
    if (minutes === 0 && seconds === 0 && timerState == 'pomodoro' && breaksCount < MAX_SHORT_BREAKS) {
      setBreaksCount(breaksCount + 1);
      // add study session when user goes to break
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
      shortBreakClickHandler(); // go to short break
    }
    if (minutes == 0 && seconds === 0 && timerState == 'pomodoro' && breaksCount >= MAX_SHORT_BREAKS) {
      setBreaksCount(0);
      // add study session when user goes to break
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
      longBreakClickHandler(); // go to long break
    }
    if (minutes == 0 && seconds == 0 && timerState != 'pomodoro') {
      setSessionCount(sessionCount + 1);
      pomodoroClickHandler();
    }
  }, [
    minutes,
    seconds,
    breaksCount,
    timerState,
    sessionCount,
    shortBreakClickHandler,
    longBreakClickHandler,
    pomodoroClickHandler,
    timeLastStarted,
    authToken,
    selectedTag,
  ]);

  // console.log('>> session count | timer state', { sessionCount }, { timerState });

  // calls the appropriate function using mode
  const handleModeChange = (mode: TimerMode) => {
    // console.log('handleModeChange called with mode:', mode); // debugging
    timerModes[mode]();
  };

  // called when reset is click
  const resetHandler = () => {
    if (isActive && timerState === 'pomodoro') {
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
    }
    handleModeChange(timerState);
  };

  // called when user toggles (play/pauses)
  const toggleTimerHandler = () => {
    sendCachedData(authToken ?? '');
    // set time last started when user clicks play
    if (!isActive && timerState === 'pomodoro') {
      setTimeLastStarted(new Date(Date.now()));
    }
    // add study session when user pauses
    if (isActive && timerState === 'pomodoro') {
      if (!timeLastStarted) {
        return;
      }
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
    }
    toggleTimer();
  };

  // called when user skips timer
  const skipHandler = () => {
    if (timerState === 'pomodoro') {
      if (breaksCount < MAX_SHORT_BREAKS) {
        setBreaksCount(breaksCount + 1);
        shortBreakClickHandler();
      } else {
        setBreaksCount(0);
        longBreakClickHandler();
      }
      return;
    }
    if (timerState === 'shortBreak') {
      setSessionCount(sessionCount + 1);
    }
    if (timerState === 'longBreak') {
      setSessionCount(sessionCount + 1);
    }
    pomodoroClickHandler();
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    localStorage.setItem('lastTagSelected', value);
    console.log('Selected Tag', value);
  };

  // Handling timer duration input
  const handleDurationChange = (mode: TimerMode, key: 'minutes' | 'seconds', value: string) => {
    if (value === '') {
      value = '0'; // Automatically set empty value to 0
    }

    setDurations((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [key]: value === '' ? '' : Math.max(0, parseInt(value, 10)), // Allow empty string or a valid number
      },
    }));
  };

  // Save new durations and immediately update the timer based on the active mode
  const saveHandler = () => {
    if (timerState === 'pomodoro') {
      setTimer({
        initialMinutes: durations.pomodoro.minutes,
        initialSeconds: durations.pomodoro.seconds,
      });
    } else if (timerState === 'shortBreak') {
      setTimer({
        initialMinutes: durations.shortBreak.minutes,
        initialSeconds: durations.shortBreak.seconds,
      });
    } else if (timerState === 'longBreak') {
      setTimer({
        initialMinutes: durations.longBreak.minutes,
        initialSeconds: durations.longBreak.seconds,
      });
    }
    setOpen(false);
    console.log(durations);
  };

  // Check if any value is greater than 59 to disable the Save button
  const isSaveDisabled = Object.values(durations).some((time) => time.minutes > 59 || time.seconds > 59);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="pt-40">
          <p className="font-bold justify-self-center text-wabi-red">#{sessionCount}</p>
          <ClockFace minutes={minutes} seconds={seconds} />
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="bg-none border-none p-0 cursor-pointer"
                aria-label="Settings"
                onClick={() => setOpen(true)}
              >
                <img src={settingIcon} alt="Settings" />
              </button>
            </DialogTrigger>
            <DialogOverlay className="bg-transparent" />

            <DialogContent>
              <DialogTitle>Change Timer Duration</DialogTitle>
              <DialogDescription>Input durations in minutes and seconds</DialogDescription>
              <div className="duration-config">
                <div className="flex flex-col mb-3">
                  <label className="text-sm font-medium mr-2">Pomodoro:</label>
                  <div>
                    <input
                      type="string"
                      value={durations.pomodoro.minutes}
                      className="w-1/5 border border-black rounded-sm pl-1 my-2"
                      onChange={(e) => handleDurationChange('pomodoro', 'minutes', e.target.value)}
                    />

                    <label className="text-sm font-medium mr-2"> minutes</label>

                    <input
                      type="string"
                      value={durations.pomodoro.seconds}
                      className="w-1/5 border border-black rounded-sm pl-1 my-2"
                      onChange={(e) => handleDurationChange('pomodoro', 'seconds', e.target.value)}
                    />
                    <label className="text-sm font-medium mr-2"> seconds</label>
                  </div>
                </div>
                <div className="flex flex-col mb-3">
                  <label className="text-sm font-medium mr-2">Short Break:</label>
                  <div>
                    <input
                      type="string"
                      value={durations.shortBreak.minutes}
                      className="w-1/5 border border-black rounded-sm pl-1 my-2"
                      onChange={(e) => handleDurationChange('shortBreak', 'minutes', e.target.value)}
                    />
                    <label className="text-sm font-medium mr-2"> minutes</label>

                    <input
                      type="string"
                      value={durations.shortBreak.seconds}
                      className="w-1/5 border border-black rounded-sm pl-1 my-2"
                      onChange={(e) => handleDurationChange('shortBreak', 'seconds', e.target.value)}
                    />
                    <label className="text-sm font-medium mr-2"> seconds</label>
                  </div>
                </div>
                <div className="flex flex-col mb-3">
                  <label className="text-sm font-medium mr-2">Long Break:</label>
                  <div>
                    <input
                      type="string"
                      value={durations.longBreak.minutes}
                      className="w-1/5 border border-black rounded-sm pl-1 my-2"
                      onChange={(e) => handleDurationChange('longBreak', 'minutes', e.target.value)}
                    />
                    <label className="text-sm font-medium mr-2"> minutes</label>

                    <input
                      type="string"
                      value={durations.longBreak.seconds}
                      className="w-1/5 border border-black rounded-sm pl-1 my-2"
                      onChange={(e) => handleDurationChange('longBreak', 'seconds', e.target.value)}
                    />
                    <label className="text-sm font-medium mr-2"> seconds</label>
                  </div>
                </div>
                {/* Warning message */}
                {(durations.pomodoro.minutes > 59 ||
                  durations.pomodoro.seconds > 59 ||
                  durations.shortBreak.minutes > 59 ||
                  durations.shortBreak.seconds > 59 ||
                  durations.longBreak.minutes > 59 ||
                  durations.longBreak.seconds > 59) && (
                  <div className="text-red-500 mb-2">Value cannot be greater than 59!</div>
                )}
                <div className="flex justify-end">
                  <UnselectedButton content="Save" onClick={saveHandler} disabled={isSaveDisabled} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-row space-x-6 pt-[136px]">
          <Button
            className="bg-white border-wabi-btn-primary-unselected border-2 hover:bg-gray-100 rounded-full w-[58px] h-[56px] mt-[6px]"
            onClick={() => resetHandler()}
          >
            <img src={resetIcon} alt="Reset" className="size-8" />
          </Button>
          {!isActive && (
            <Button
              className="rounded-full w-[67px] h-[65px] bg-wabi-btn-primary-unselected hover:bg-wabi-btn-hover-primary-unselected"
              onClick={() => toggleTimerHandler()}
            >
              <img src={playIcon} alt="Play" className="fill-white ml-1 w-6 h-6" />
            </Button>
          )}
          {isActive && (
            <Button
              className="rounded-full w-[67px] h-[65px] bg-wabi-btn-primary-unselected hover:bg-wabi-btn-hover-primary-unselected"
              onClick={() => toggleTimerHandler()}
            >
              <img src={pauseIcon} alt="Pause" className="fill-white size-6" />
            </Button>
          )}
          <Button
            className="bg-white border-wabi-btn-primary-unselected border-2 hover:bg-gray-100 w-[58px] h-[56px] rounded-full mt-[6px]"
            onClick={() => skipHandler()}
          >
            <img src={skipIcon} alt="Skip" className="size-5" />
          </Button>
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
        <div className="flex flex-row space-x-6 pt-[10px]">
          <TagDropdown className="w-48 " onSelectChange={handleTagChange} isDisabled={isActive} />
        </div>
      </div>
    </>
  );
};

export default TimerDashboard;
