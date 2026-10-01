import FounderPanel from '@/components/blocks/teams-page/team'

export type TeamProps = { src: string; title: string; description: string; isFeatured: boolean; href: string }
const Teams = ({ teamMembers }: { teamMembers: TeamProps[] }) => <FounderPanel teamMembers={teamMembers} />

export default Teams
