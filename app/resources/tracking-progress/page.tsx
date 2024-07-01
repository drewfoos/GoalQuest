import ResourcePage from "@/components/ResourcePage";

const sections = [
  {
    title: "Set Clear Milestones",
    content: (
      <p>
        Break your goal into smaller, measurable milestones. This makes it
        easier to track progress and stay motivated. Use GoalQuest's sub-tasks
        feature to create and track these milestones effectively.
      </p>
    ),
  },
  {
    title: "Use GoalQuest Consistently",
    content: (
      <p>
        Make it a habit to regularly update your progress in GoalQuest. The app
        provides visual representations of your advancement, helping you stay
        motivated and on track.
      </p>
    ),
  },
  {
    title: "Keep a Goal Journal",
    content: (
      <p>
        Write down your daily or weekly progress. This helps you reflect on your
        journey and identify areas for improvement. Use GoalQuest's notes
        feature to maintain a digital goal journal alongside your progress
        tracking.
      </p>
    ),
  },
  {
    title: "Leverage Visual Aids",
    content: (
      <p>
        Utilize GoalQuest's charts and progress bars to visually represent your
        advancement towards your goals. Visual representations can provide
        powerful motivation and clarity on your progress.
      </p>
    ),
  },
  {
    title: "Schedule Regular Check-ins",
    content: (
      <p>
        Set reminders in GoalQuest to review your progress regularly, whether
        it's daily, weekly, or monthly, depending on your goal. Consistent
        check-ins help you stay accountable and make necessary adjustments to
        your approach.
      </p>
    ),
  },
];

export default function TrackingProgress() {
  return (
    <ResourcePage title="How to Track Your Progress" sections={sections} />
  );
}
