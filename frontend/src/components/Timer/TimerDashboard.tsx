import { Button } from '@/components/ui/button';
import { useCountdown } from './hooks';
import ClockFace from './ClockFace';
import { useCallback, useEffect, useState } from 'react';
import playIcon from '../../assets/play.svg';
import resetIcon from '../../assets/reset-2.svg';
import skipIcon from '../../assets/skip.svg';
import pauseIcon from '../../assets/pause.svg';
import SelectedButton from '@/components/ui/SelectedButton';
import { useAuth } from '@/components/AuthProviderUtils';
import { addStudySession, sendCachedData, useSaveDataOnReload } from './utils';
import { useOutletContext } from 'react-router-dom';
import TagDropdown from '../SelectTag';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
type DashboardContextType = {
  registerSaveHandler: (handler: () => void) => void;
};
const TimerDashboard = () => {
  const { registerSaveHandler } = useOutletContext<DashboardContextType>(); // gets the register save handler from dashboard container

  const { isActive, toggleTimer, resetTimer, setTimer, minutes, seconds } = useCountdown({
    initialMinutes: 0,
    initialSeconds: 5,
  }); // contains actual countdown timer

  const { authToken } = useAuth(); // user authentication token

  const [timerState, setTimerState] = useState<keyof typeof timerModes>('pomodoro'); // current timer mode
  const [sessionCount, setSessionCount] = useState<number>(1); // number of pomodoro sessions run
  const [breaksCount, setBreaksCount] = useState<number>(0); // number of short breaks used
  const [timeLastStarted, setTimeLastStarted] = useState<Date>(new Date()); // last time timer was started
  const MAX_SHORT_BREAKS = 3; // maximum number of short breaks allowed
  const [selectedTag, setSelectedTag] = useState<string>('');

  // saves last study session to cache when user reloads
  useSaveDataOnReload({ timeLastStarted, isActive });

  // save handler for saving last study session data to cache;
  // passed into registerSaveHandler so the DashboardContainer
  // can use this function whenever the user navigates outside of /timer page
  const saveDataToCache = useCallback(() => {
    if (isActive) {
      localStorage.setItem('unsavedStart', timeLastStarted.toISOString());
      localStorage.setItem('unsavedEnd', new Date().toISOString());
      console.log('Timer data saved to local storage');
    }
  }, [isActive, timeLastStarted]);

  // register the save handler with the parent
  useEffect(() => {
    registerSaveHandler(saveDataToCache);
  }, [registerSaveHandler, isActive, timeLastStarted, saveDataToCache]);

  // -- functions called when user selects timer type buttons
  const pomodoroClickHandler = useCallback(() => {
    resetTimer();
    setTimer({
      initialMinutes: 0,
      initialSeconds: 5,
    });
    setTimerState('pomodoro');
  }, [resetTimer, setTimer]);

  const shortBreakClickHandler: () => void = useCallback(() => {
    if (isActive && timerState === 'pomodoro')
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
    resetTimer();
    setTimer({
      initialMinutes: 0,
      initialSeconds: 5,
    });
    setTimerState('shortBreak');
  }, [authToken, isActive, resetTimer, selectedTag, setTimer, timeLastStarted, timerState]);

  const longBreakClickHandler: () => void = useCallback(() => {
    if (isActive && timerState === 'pomodoro')
      addStudySession(timeLastStarted.toISOString(), new Date().toISOString(), selectedTag, authToken);
    resetTimer();
    setTimer({
      initialMinutes: 0,
      initialSeconds: 5,
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
    sendCachedData(authToken ?? '', selectedTag);
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
        <div className="flex flex-row space-x-6 pt-[30px]">
          <TagDropdown className="w-48 " onSelectChange={handleTagChange} isDisabled={isActive} />
        </div>
      </div>
    </>
  );
};

export default TimerDashboard;
