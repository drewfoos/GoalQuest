import ResourcePage from "@/components/ResourcePage";

const sections = [
  {
    title: "Make Your Goals SMART",
    content: (
      <>
        <p className="mb-4">
          SMART is an acronym that stands for Specific, Measurable, Achievable,
          Relevant, and Time-bound. Using this framework helps create clear,
          attainable goals.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Specific:</strong> Clearly define what you want to
            accomplish.
          </li>
          <li>
            <strong>Measurable:</strong> Include concrete criteria for measuring
            progress.
          </li>
          <li>
            <strong>Achievable:</strong> Make sure it's possible to achieve the
            goal.
          </li>
          <li>
            <strong>Relevant:</strong> The goal should align with your broader
            objectives.
          </li>
          <li>
            <strong>Time-bound:</strong> Set a realistic deadline.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Write Your Goals Down",
    content: (
      <p>
        The act of writing down your goals makes them more tangible and
        increases your commitment to achieving them. Use GoalQuest to document
        and track your goals effectively.
      </p>
    ),
  },
  {
    title: "Break Big Goals into Smaller Steps",
    content: (
      <p>
        Large goals can be overwhelming. Break them down into smaller,
        manageable tasks to make steady progress. This approach helps maintain
        motivation and provides a clear path forward.
      </p>
    ),
  },
  {
    title: "Review and Adjust Regularly",
    content: (
      <p>
        Periodically review your goals and adjust them as needed. Circumstances
        change, and your goals should adapt accordingly. Regular reviews also
        help you stay focused and motivated.
      </p>
    ),
  },
];

export default function EffectiveGoalSetting() {
  return (
    <ResourcePage title="Guide to Effective Goal Setting" sections={sections} />
  );
}
