import { getWeekNumberInMonth } from '../../utils/getWeekNumberInMonth';

type WeekNavProps = {
  baseDate: Date;
  onPrev: () => void;
  onNext: () => void;
  startOnMonday?: boolean;
};

export default function WeekNav(props: WeekNavProps) {
  const { baseDate, onPrev, onNext, startOnMonday = false } = props;

  const weekNum = getWeekNumberInMonth(baseDate, startOnMonday);

  const label = `Week ${weekNum}, ${baseDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`;

  return (
    <nav className='week-nav' aria-label='Week navigation'>
      <button type='button' className='week-nav__arrow' onClick={onPrev}>
        ‹<span className='sr-only'>Previous week</span>
      </button>

      <span className='week-nav__label'>{label}</span>

      <button type='button' className='week-nav__arrow' onClick={onNext}>
        ›<span className='sr-only'>Next week</span>
      </button>
    </nav>
  );
}
