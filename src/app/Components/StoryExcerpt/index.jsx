import moment from 'momentjs';
import styles from './style.css';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import React, { Component, PropTypes } from 'react';
import LikeButton from 'Components/LikeButton';

class StoryExcerpt extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		onClick: PropTypes.func,
		story: PropTypes.object.isRequired,
	}

	/**
	 * Invoked when the like button is clicked.
	 *
	 * @return {void}
	 */
	onLikeClick = () => {
		this.props.story.toggleLike();
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const { story } = this.props;

		return (
			<article className={styles.article}>
				<div className={styles.upper}>
					<div
						className={styles.image}
						style={{ backgroundImage: `url(${story.image_url})` }}
					/>
					<div className={styles.overlay} />
					<Link
						className={styles.link}
						to={`/story/${story.id}`}
						onClick={this.props.onClick}
					>
						<h1 className={styles.title}>
							{story.title}
						</h1>
					</Link>
				</div>
				<div className={styles.lower}>
					<img className={styles.author_image} src={story.author.image_url} />
					<div className={styles.lower_left}>
						<p className={styles.author_name}>
							{story.author.name}
						</p>
						<p className={styles.date}>
							{moment(story.created_at).format('D-M-YYYY')}
						</p>
					</div>
					<div className={styles.lower_right}>
						<LikeButton
							active={story.liked}
							onClick={this.onLikeClick}
							amount={story.like_count}
						/>
					</div>
				</div>
			</article>
		);
	}
}

export default observer(StoryExcerpt);
