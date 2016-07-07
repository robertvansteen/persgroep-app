import styles from './style';
import Status from './Status';
import Actions from './Actions';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';

const AssignmentDetail = props => {
	const { title, description } = props.assignment;
	const image = props.assignment.image_url;
	const subscribeStatus = props.assignment.subscribe_status;

	return (
		<div className={styles.wrapper}>

			<div className={styles.header}>
				<Link className={styles.backButton} to="/assignments">
					<i className="icon-arrow-back"></i>
				</Link>
				<div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
				<div className={styles.overlay} />
				<div className={styles.header__content}>
					<p className={styles.title}>
						{title}
					</p>
				</div>
			</div>

			<div className={styles.main}>
				<p className={styles.description}>
					{description}
				</p>

				<Status status={subscribeStatus} />
				<Actions status={subscribeStatus} onClick={props.onSubscribe} />

				{subscribeStatus === 'accepted'
					? (<Link to="/write" className={styles.write}>
							Aan de slag met de opdracht!
						</Link>)
					: null
				}
			</div>

		</div>
	);
};

AssignmentDetail.propTypes = {
	onSubscribe: PropTypes.func.isRequired,
	assignment: PropTypes.object.isRequired,
};

export default observer(AssignmentDetail);
