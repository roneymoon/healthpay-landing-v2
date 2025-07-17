import { type FeatureLookupProps } from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import Views from '@/assets/views.svg'
import WorkFlow from '@/assets/workflow.svg'
import Sla from '@/assets/sla.svg'
import Filter from '@/assets/filter.svg'

export const issueTrackingFeatureLookup: FeatureLookupProps[] = [
	{
		id: 'issue-tracking-feature-1',
		title: 'Tailored claim workflows',
		description: 'claim processing with customizable workflows built for your team.',
		icon: <WorkFlow />,
	},
	{
		id: 'issue-tracking-feature-2',
		title: 'Smart views',
		description: 'Toggle between dashboards and detailed views. Group claims by provider, status, or urgency.',
		icon: <Views />,
	},
	{
		id: 'issue-tracking-feature-3',
		title: 'Dynamic filters',
		description: 'Quickly narrow down claims by policy type, risk level, or submission date.',
		icon: <Filter />,
	},
	{
		id: 'issue-tracking-feature-4',
		title: 'Automated SLAs',
		description: 'Set and monitor deadlines for approvals, reimbursements, and escalations—automatically.',
		icon: <Sla />,
	},
]
