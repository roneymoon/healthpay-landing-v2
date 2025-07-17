import { type FeatureLookupProps } from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import Support from '@/assets/support.svg'
import Progress from '@/assets/progress.svg'
import Workflow from '@/assets/workflow.svg'
import { TabHeaders } from './components/wide-card/tab-header'

export const longTermFeatureLookup: FeatureLookupProps[] = [
	{
		id: 'claims-feature-1',
		title: 'Scalable Ops',
		description: 'Process 1,000 to 100,000+ claims monthly—without scaling headcount.',
		icon: <Progress />,
	},
	{
		id: 'claims-feature-2',
		title: 'Cost Savings',
		description: 'Cut up to 70% in operational costs per claim.',
		icon: <Progress />,
	},
	{
		id: 'claims-feature-3',
		title: 'Multi-Claim Support',
		description: 'From IPD to OPD to short-stay procedures—all in one workflow.',
		icon:<Progress />,
	},
	{
		id: 'claims-feature-4',
		title: '5-Minute TAT',
		description: 'Drastically reduce turnaround time from 40+ minutes to just 5.',
		icon: <Progress />,
	},
]

export const tabHeaders: TabHeaders[] = [
	{
		id: 'tab-header-1',
		title: 'Smart Claims Extraction',
	},
	{
		id: 'tab-header-2',
		title: 'Automated Validation Checks',
	},
	{
		id: 'tab-header-3',
		title: 'Real-Time Approval Triggers',
	},
]
