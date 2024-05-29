import { useState } from 'react'
import styles from './counter.module.css'

export interface CounterProps {
	initialCount: number
}

export const Counter = ({ initialCount }: CounterProps) => {
	const [count, setCount] = useState(initialCount)

	const increment = () => setCount(count + 1)
	const decrement = () => setCount(count - 1)

	return (
		<div className={styles.container}>
			<p className={styles.count}>
				<span>Count:</span>
				<span>{count}</span>
			</p>
			<button className={styles.button} type="button" onClick={increment}>
				Increment
			</button>
			<button className={styles.button} type="button" onClick={decrement}>
				Decrement
			</button>
		</div>
	)
}
