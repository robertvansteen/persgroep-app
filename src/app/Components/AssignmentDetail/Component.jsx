import styles from './style';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';
import SubscribeButton from './SubscribeButton/Component';

const AssignmentDetail = props => {
	const { title, image_url, description } = props.assignment;


	return (
		<div className={styles.wrapper}>

			<div className={styles.header}>
				<Link className={styles.backButton} to="/assignments">
					<i className="icon-arrow-back"></i>
				</Link>
				<div className={styles.image} style={{ backgroundImage: `url(${image_url})` }} />
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
				<div className={styles.action}>
					<SubscribeButton
						status={props.assignment.subscribe_status}
						onClick={props.onSubscribe}
					/>
				</div>
			</div>

		</div>
	);
};

AssignmentDetail.propTypes = {
	onSubscribe: PropTypes.func.isRequired,
	assignment: PropTypes.object.isRequired,
};

export default observer(AssignmentDetail);
