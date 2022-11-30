import * as React from "react"
import Layout from "@/components/layout"
import ToolItem from "@/components/toolPageItem/toolItem"
import Seo from "../components/seo"

interface IToolInfo {
	href: String,
	name: String,
	desc: String,
	icon?: String
}
const Tools = () => {
	const toolInfoList: IToolInfo[] = [
		{
			href: 'recorder',
			name: 'Online Recorder',
			desc: 'online screen/audio recorder base on browser.',
			icon: 'record'
		}
	]
	return(
		<Layout headerClassName={'transparentHeader'} fullScreenContent={true}>
			<Seo title="Tools" />
			<div className="water-bg-page">
				<h1>Some Useful Tools.</h1>
				{toolInfoList.map((info, index) => {
					return (
						<ToolItem info={info} key={index}></ToolItem>
					)
				})}
			</div>
		</Layout>
	)
}

export default Tools