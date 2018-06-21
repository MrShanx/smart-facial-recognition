import React from 'react';
import './Rank.css';

const Rank = ({ name, entries, rankings }) => {
	return(
		<div>
			<div className="gray-outer-container">
				<div className="gray-inner-container b ma4 mt0">
					<div className="gray f3 o-90">
						{` #1: ${rankings.firstName} (${rankings.firstEntries})`}
					</div>
					<div className="gray f4 o-70">
						{` #2: ${rankings.secondName} (${rankings.secondEntries})`}
					</div>
					<div className="gray f5 o-50">
						{`#3: ${rankings.thirdName} (${rankings.thirdEntries})`}
					</div>
					<div className="gray f6 o-50 mb2">
						{"..."}
					</div>
				</div>
			</div>
			<div>
				<div className="white f3">
					{`${name}, your current entry count is...`}
				</div>
				<div className="white f1">
					{entries}
				</div>
			</div>
		</div>
	);
}

export default Rank;