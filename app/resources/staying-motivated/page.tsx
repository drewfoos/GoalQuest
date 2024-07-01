import ResourcePage from "@/components/ResourcePage";

const sections = [
  {
    title: "Celebrate Small Wins",
    content: (
      <p>
        Acknowledge and celebrate your progress, no matter how small. This
        builds momentum and keeps you motivated. Use GoalQuest to track and
        celebrate these milestones along your journey.
      </p>
    ),
  },
  {
    title: "Visualize Your Success",
    content: (
      <p>
        Regularly imagine yourself achieving your goals. This mental practice
        can boost your motivation and confidence. Create a vision board or use
        the notes feature in GoalQuest to describe your envisioned success.
      </p>
    ),
  },
  {
    title: "Find an Accountability Partner",
    content: (
      <p>
        Share your goals with a friend or mentor who can check in on your
        progress and offer support. Consider joining or creating a goal-oriented
        community within GoalQuest to find like-minded individuals.
      </p>
    ),
  },
  {
    title: "Create a Positive Environment",
    content: (
      <p>
        Surround yourself with people, things, and media that inspire and
        motivate you towards your goals. Customize your GoalQuest dashboard with
        motivational quotes and images to keep you inspired.
      </p>
    ),
  },
  {
    title: "Remember Your 'Why'",
    content: (
      <p>
        Regularly remind yourself why you set this goal in the first place.
        Connect with your deeper motivation. Use GoalQuest's goal description
        field to clearly state your 'why' for each goal you set.
      </p>
    ),
  },
];

export default function StayingMotivated() {
  return (
    <ResourcePage title="Tips for Staying Motivated" sections={sections} />
  );
}
